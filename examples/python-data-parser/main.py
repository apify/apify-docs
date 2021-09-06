from io import BytesIO
import os

from apify_client import ApifyClient
from apify_client.consts import ActorJobStatus
import pandas

# Initialize the main ApifyClient instance
client = ApifyClient(os.environ['APIFY_TOKEN'], api_url=os.environ['APIFY_API_BASE_URL'])

# Run the weather scraper and wait for it to finish
print('Downloading the weather data...')
scraper_run = client.actor('~bbc-weather-scraper').call()

# Check if the scraper finished successfully, and raise an error otherwise
if scraper_run['status'] != ActorJobStatus.SUCCEEDED:
    raise RuntimeError('The weather scraper run has failed')

# Get the resource subclient for working with the dataset with the source data
dataset_client = client.dataset(scraper_run['defaultDatasetId'])

# Load the dataset items into a pandas dataframe
print('Parsing weather data...')
dataset_items_stream = dataset_client.stream_items(item_format='csv')
weather_data = pandas.read_csv(dataset_items_stream, parse_dates=['datetime'], date_parser=lambda val: pandas.to_datetime(val, utc=True))

# Transform data to a pivot table for easier plotting
pivot = weather_data.pivot(index='datetime', columns='location', values='temperature')
mean_daily_temperatures = pivot.rolling(window='24h', min_periods=24, center=True).mean()

# Create a plot of the data
print('Plotting the data...')
axes = mean_daily_temperatures.plot(figsize=(10, 5))
axes.set_title('Weather prediction for holiday destinations')
axes.set_xlabel(None)
axes.yaxis.set_major_formatter(lambda val, _: f'{int(val)} °C')
axes.grid(which='both', linestyle='dotted')
axes.legend(loc='best')
axes.figure.tight_layout()

# Get the resource subclient for working with the default key-value store of the run
key_value_store_client = client.key_value_store(os.environ['APIFY_DEFAULT_KEY_VALUE_STORE_ID'])

# Save the resulting plot to the key-value store through an in-memory buffer
print('Saving plot to key-value store...')
with BytesIO() as buf:
    axes.figure.savefig(buf, format='png', dpi=200, facecolor='w')
    buf.seek(0)
    key_value_store_client.set_record('prediction.png', buf, 'image/png')

print(f'Result is available at {os.environ["APIFY_API_PUBLIC_BASE_URL"]}'
      + f'/v2/key-value-stores/{os.environ["APIFY_DEFAULT_KEY_VALUE_STORE_ID"]}/records/prediction.png')
