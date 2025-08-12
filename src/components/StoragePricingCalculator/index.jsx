import { useColorMode } from '@docusaurus/theme-common';
import Admonition from '@theme/Admonition';
import clsx from 'clsx';
import React, { useMemo, useState } from 'react';

import styles from './StoragePricingCalculator.module.css';

const pricingTiers = [
  {
    name: 'Free/Starter',
    description: '$0/month & $39/month',
    storageMultiplier: 1.0,
    readMultiplier: 1.0,
    writeMultiplier: 1.0,
    listMultiplier: 1.0,
  },
  {
    name: 'Scale',
    description: '$199/month',
    storageMultiplier: 0.9,
    readMultiplier: 0.9,
    writeMultiplier: 0.9,
    listMultiplier: 0.9,
  },
  {
    name: 'Business',
    description: '$999/month',
    storageMultiplier: 0.8,
    readMultiplier: 0.8,
    writeMultiplier: 0.8,
    listMultiplier: 0.8,
  },
];

const storageTypes = [
  {
    name: 'Dataset',
    description: 'Stores results from web scraping and data processing',
    baseStoragePrice: 1.00,
    baseReadPrice: 0.0004,
    baseWritePrice: 0.005,
    hasLists: false,
  },
  {
    name: 'Key-value Store',
    description: 'Stores various data types like JSON, HTML, images, and strings',
    baseStoragePrice: 1.00,
    baseReadPrice: 0.005,
    baseWritePrice: 0.05,
    baseListPrice: 0.05,
    hasLists: true,
  },
  {
    name: 'Request Queue',
    description: 'Manages URL processing for web crawling and other tasks',
    baseStoragePrice: 4.00,
    baseReadPrice: 0.004,
    baseWritePrice: 0.02,
    hasLists: false,
  },
];

const StoragePricingCalculator = () => {
  const { isDarkTheme } = useColorMode();
  const [selectedStorageType, setSelectedStorageType] = useState(storageTypes[0]);
  const [selectedTier, setSelectedTier] = useState(pricingTiers[0]);
  const [storageGB, setStorageGB] = useState(1);
  const [storageHours, setStorageHours] = useState(24);
  const [reads, setReads] = useState(1000);
  const [writes, setWrites] = useState(1000);
  const [lists, setLists] = useState(1000);

  const calculations = useMemo(() => {
    const storageCost = ((storageGB * storageHours) / 1000) * selectedStorageType.baseStoragePrice * selectedTier.storageMultiplier;
    const readCost = (reads / 1000) * selectedStorageType.baseReadPrice * selectedTier.readMultiplier;
    const writeCost = (writes / 1000) * selectedStorageType.baseWritePrice * selectedTier.writeMultiplier;
    const listCost = selectedStorageType.hasLists && selectedStorageType.baseListPrice
      ? (lists / 1000) * selectedStorageType.baseListPrice * (selectedTier.listMultiplier || 1)
      : 0;

    const totalCost = storageCost + readCost + writeCost + listCost;

    return {
      storageCost: storageCost.toFixed(4),
      readCost: readCost.toFixed(4),
      writeCost: writeCost.toFixed(4),
      listCost: listCost.toFixed(4),
      totalCost: totalCost.toFixed(4),
    };
  }, [selectedStorageType, selectedTier, storageGB, storageHours, reads, writes, lists]);

  return (
    <div className={clsx(styles.calculator, isDarkTheme && styles.dark)}>
      <div className={styles.header}>
        <h3>Storage Pricing</h3>
        <p>Estimate costs for your storage usage</p>
      </div>

      <Admonition type="warning" title="This is an estimate">
        This is an estimate based on current pricing. Actual costs may vary.<br/>
        Prices are per 1,000 GB-hours for storage and per operation for reads/writes/lists.
      </Admonition>

      <div className={styles.controls}>
        <div className={styles.selectionRow}>
          <div className={styles.section}>
            <h4>Storage Type</h4>
            <div className={styles.radioGroup}>
              {storageTypes.map((type) => (
                <label key={type.name} className={styles.radioOption}>
                  <input
                    type="radio"
                    name="storageType"
                    value={type.name}
                    checked={selectedStorageType.name === type.name}
                    onChange={() => setSelectedStorageType(type)}
                  />
                  <div className={styles.radioContent}>
                    <strong>{type.name}</strong>
                    <span>{type.description}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h4>Plan</h4>
            <div className={styles.radioGroup}>
              {pricingTiers.map((tier) => (
                <label key={tier.name} className={styles.radioOption}>
                  <input
                    type="radio"
                    name="plan"
                    value={tier.name}
                    checked={selectedTier.name === tier.name}
                    onChange={() => setSelectedTier(tier)}
                  />
                  <div className={styles.radioContent}>
                    <strong>{tier.name}</strong>
                    <span>{tier.description}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h4>Usage</h4>
          <div className={styles.inputGrid}>
            <div className={styles.inputGroup}>
              <label htmlFor="storageGB">Storage (GB)</label>
              <input
                id="storageGB"
                type="number"
                min="0.1"
                step="0.1"
                value={storageGB}
                onChange={(e) => setStorageGB(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="reads">Reads (count)</label>
              <input
                id="reads"
                type="number"
                min="0"
                value={reads}
                onChange={(e) => setReads(parseInt(e.target.value, 10) || 0)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="storageHours">Duration (hours)</label>
              <input
                id="storageHours"
                type="number"
                min="1"
                value={storageHours}
                onChange={(e) => setStorageHours(parseInt(e.target.value, 10) || 0)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="writes">Writes (count)</label>
              <input
                id="writes"
                type="number"
                min="0"
                value={writes}
                onChange={(e) => setWrites(parseInt(e.target.value, 10) || 0)}
              />
            </div>
            {selectedStorageType.hasLists && (
              <div className={styles.inputGroupFullWidth}>
                <label htmlFor="lists">Lists (count)</label>
                <input
                  id="lists"
                  type="number"
                  min="0"
                  value={lists}
                  onChange={(e) => setLists(parseInt(e.target.value, 10) || 0)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.results}>
        <h4>Estimated Costs</h4>
        <div className={styles.costBreakdown}>
          <div className={styles.costItem}>
            <span>Storage ({storageGB} GB × {storageHours} hours)</span>
            <span>${calculations.storageCost}</span>
          </div>
          <div className={styles.costItem}>
            <span>Reads ({reads.toLocaleString()} operations)</span>
            <span>${calculations.readCost}</span>
          </div>
          <div className={styles.costItem}>
            <span>Writes ({writes.toLocaleString()} operations)</span>
            <span>${calculations.writeCost}</span>
          </div>
          {selectedStorageType.hasLists && (
            <div className={styles.costItem}>
              <span>Lists ({lists.toLocaleString()} operations)</span>
              <span>${calculations.listCost}</span>
            </div>
          )}
          <div className={styles.totalCost}>
            <strong>Total Estimated Cost</strong>
            <strong>${calculations.totalCost}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoragePricingCalculator;
