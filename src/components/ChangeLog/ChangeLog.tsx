import Link from '@docusaurus/Link';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

const NUMBER_OF_CHANGELOG_ITEMS = 5;
const CHANGE_LOG_API_URL = 'https://cms.apify.com/api/change-log-items';
const CHANGE_LOG_WEB_URL = 'https://apify.com/change-log';

interface ChangeLogItem {
  attributes: {
    title: string;
    publishedAt: string;
    path: string;
    components: {
      data: {
        attributes: {
          value: string;
        };
      }[];
    };
    types: {
      data: {
        attributes: {
          value: string;
        };
      }[];
    };
  };
}

const humanizeDate = (date: string) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString('en-us', { month: 'long' });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    return `${month} ${day}, ${year}`;
};

export default function ChangeLog() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [changeLogData, setchangeLogData] = useState([]);

    useEffect(() => {
        const fetchChangeLogData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const response = await fetch(
                    `${CHANGE_LOG_API_URL}?populate=deep&pagination[limit]=${NUMBER_OF_CHANGELOG_ITEMS}&sort=publishedAt:desc`,
                );
                const { data } = await response.json();

                setchangeLogData(data);
            } catch (error) {
                setIsError(true);
                // eslint-disable-next-line no-console
                console.error('Error while fetching change log data', error);
            }
            setIsLoading(false);
        };

        void fetchChangeLogData();
    }, []);

    if (isError) {
        return (
            <div>
                We&apos;re sorry, it wasn&apos;t possible to fetch current change log data.
            </div>
        );
    }

    if (isLoading) {
        return <div>Loading change log ...</div>;
    }

    return (
        <div>
            {changeLogData && changeLogData.length ? (
                <div>
                    {changeLogData.map((changeLog: ChangeLogItem) => (
                        <div key={changeLog.attributes.path} className={styles.changeLogItem}>
                            <div className={styles.changeLogDate}>
                                {humanizeDate(changeLog.attributes.publishedAt)}
                            </div>
                            <Link to={`${CHANGE_LOG_WEB_URL}/${changeLog.attributes.path}`}>
                                <h3>{changeLog.attributes.title}</h3>
                            </Link>
                            <div className={styles.changeLogProperties}>
                                {changeLog.attributes.types.data.map((type) => (
                                    <span key={type.attributes.value} className={styles.changeLogChipType}>{type.attributes.value}</span>
                                ))}
                                {changeLog.attributes.components.data.map((component) => (
                                    <span key={component.attributes.value} className={styles.changeLogChipComponent}>{component.attributes.value}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>Change log is empty right now.</div>
            )}
            <div>
                <Link to={CHANGE_LOG_WEB_URL} className="actionLink">See all changes</Link>
            </div>
        </div>
    );
}
