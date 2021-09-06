from datetime import datetime, time, timedelta, timezone
import os
import re

from apify_client import ApifyClient
from bs4 import BeautifulSoup
import requests

# Locations which to scrape and their BBC Weather IDs
LOCATIONS = [
    ('Prague', '3067696'),
    ('Honolulu', '5856195'),
    ('New York', '5128581'),
]

# List with scraped results
weather_data = []

# Scrape each location separately
for (location_name, location_id) in LOCATIONS:
    print(f'Scraping weather from {location_name}...')
    location_timezone = None
    first_displayed_date = None
    for day_offset in range(14):
        # Get the BBC Weather page for the given location and day and parse it with BeautifulSoup
        response = requests.get(f'https://www.bbc.com/weather/{location_id}/day{day_offset}')
        soup = BeautifulSoup(response.content, 'html.parser')

        # When parsing the first day, find out what day it represents,
        # to know when do the results start
        if day_offset == 0:
            # Get the timezone offset written in the page footer and parse it
            tz_description = soup.find_all(class_='wr-c-footer-timezone__item')[1].text
            tz_offset_match = re.search(r'([+-]\d\d)(\d\d)', tz_description)
            tz_offset_hours = int(tz_offset_match.group(1))
            tz_offset_minutes = int(tz_offset_match.group(2))

            # Get the current date and time at the scraped location
            timezone_offset = timedelta(hours=tz_offset_hours, minutes=tz_offset_minutes)
            location_timezone = timezone(timezone_offset)

            location_current_datetime = datetime.now(tz=location_timezone)

            # The times displayed for each day are from 6:00 AM that day to 5:00 AM the next day,
            # so "today" on BBC Weather might actually mean "yesterday" in actual datetime.
            # We have to parse the accessibility label containing the actual date on the header for the first day
            # and compare it with the current date at the location, and adjust the date accordingly
            day_carousel_item = soup.find(class_='wr-day--active')
            day_carousel_title = day_carousel_item.find(class_='wr-day__title')['aria-label']
            website_first_displayed_item_day = int(re.search(r'\d{1,2}', day_carousel_title).group(0))

            if location_current_datetime.day == website_first_displayed_item_day:
                first_displayed_date = location_current_datetime.date()
            else:
                first_displayed_date = location_current_datetime.date() - timedelta(days=1)

        # Go through the elements for each displayed time slot of the displayed day
        slot_container = soup.find(class_='wr-time-slot-container__slots')
        for slot in slot_container.find_all(class_='wr-time-slot'):
            # Find out the date and time of the displayed element from the day offset and the displayed hour.
            # The times displayed for each day are from 6:00 AM that day to 5:00 AM the next day,
            # so anything between midnight and 6 AM actually represents the next day
            slot_hour = int(slot.find(class_='wr-time-slot-primary__hours').text)
            slot_datetime = datetime.combine(first_displayed_date, time(hour=slot_hour), tzinfo=location_timezone)
            slot_datetime += timedelta(days=day_offset)
            if slot_hour < 6:
                slot_datetime += timedelta(days=1)

            # Parse the temperature from the right element
            slot_temperature = int(slot.find(class_='wr-value--temperature--c').text[:-1])

            # Add the parsed data to the result list
            weather_data.append({
                'datetime': slot_datetime,
                'location': location_name,
                'temperature': slot_temperature,
            })

# Initialize the main ApifyClient instance
client = ApifyClient(os.environ['APIFY_TOKEN'], api_url=os.environ['APIFY_API_BASE_URL'])

# Get the resource subclient for working with the default dataset of the actor run
default_dataset_client = client.dataset(os.environ['APIFY_DEFAULT_DATASET_ID'])

# Finally, push all the results into the dataset
default_dataset_client.push_items(weather_data)

print(f'Results have been saved to the dataset with ID {os.environ["APIFY_DEFAULT_DATASET_ID"]}')
