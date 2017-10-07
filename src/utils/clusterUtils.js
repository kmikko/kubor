export function stylePrice(amount, currency = "USD") {
  const price = (amount / 100).toFixed(2);
  if (currency === "USD") {
    return `$${price}`;
  } else if (currency === "EUR") {
    return `${price}€`;
  } else {
    return price;
  }
}

export function styleCostName(cost) {
  if (cost.type === "custom") {
    return capitalizeFirstLetter(cost.label);
  } else {
    return capitalizeFirstLetter(cost.type);
  }
}

export function styleBytes(bytes) {
  console.log("BYTES", bytes);
  // TODO: This is ugly af
  if (bytes < 1000000) {
    return `${bytes} B`;
  } else if (bytes < 10000000) {
    return `${(bytes / 10000).toFixed(2)} KB`;
  } else if (bytes < 1000000000) {
    return `${(bytes / 1000000).toFixed(2)} MB`;
  } else if (bytes < 1000000000000) {
    return `${(bytes / 1000000000).toFixed(2)} GB`;
  } else {
    return `${(bytes / 1000000000000).toFixed(2)} TB`;
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function calculateResourceUsagePrice(usage, total, price) {
  let average = proportionalUsage(usage, total);

  return average
    .map(x => x[1] * (price / total.length))
    .reduce((prev, curr) => prev + curr, 0);
}

function proportionalUsage(usage, total) {
  let avg = [];

  if (usage.length !== total.length) {
    return avg;
  }

  for (let i = 0; i < usage.length - 1; i++) {
    avg.push([usage[i][0], usage[i][1] / total[i][1] || 0]);
  }
  return avg;
}

export function calculateResourceUsageHours(usage) {
  return usage.filter(x => x[1] !== 0).length;
}

function calculateCumulativeUsage(usage) {
  return usage.reduce((prev, curr) => prev + curr[1], 0);
}

function calculateLastUsage(usage) {
  return usage.reduce((prev, curr) => (curr[1] === 0 ? prev : curr[1]), 0);
}

export function calculateNamespaceUsage(
  clusterCosts,
  namespaceUsage,
  totalUsage
) {
  // CPU
  const cpuTotalPrice = calculateResourceUsagePrice(
    namespaceUsage.cpu,
    totalUsage.cpu,
    clusterCosts.filter(x => x.type === "cpu").map(x => x.cost)[0] || []
  );
  const cpuTotalUsage = calculateResourceUsageHours(namespaceUsage.cpu);
  const cpuPerHourPrice = cpuTotalPrice / cpuTotalUsage;

  // Memory
  const memoryTotalPrice = calculateResourceUsagePrice(
    namespaceUsage.memory,
    totalUsage.memory,
    clusterCosts.filter(x => x.type === "memory").map(x => x.cost)[0] || []
  );
  const memoryTotalUsage = calculateResourceUsageHours(namespaceUsage.memory);
  const memoryPerHourPrice = memoryTotalPrice / memoryTotalUsage;

  // Network
  const networkTotalPrice = calculateResourceUsagePrice(
    namespaceUsage.network,
    totalUsage.network,
    clusterCosts.filter(x => x.type === "network").map(x => x.cost)[0] || []
  );
  const networkTotalUsage = calculateCumulativeUsage(namespaceUsage.network);
  const networkPerHourPrice = 0;

  // Storage
  const storageTotalPrice = calculateResourceUsagePrice(
    namespaceUsage.storage,
    totalUsage.storage,
    clusterCosts.filter(x => x.type === "storage").map(x => x.cost)[0] || []
  );
  const storageTotalUsage = calculateLastUsage(namespaceUsage.storage);
  const storagePerHourPrice = 0;

  let costs = {
    cpu: {
      totalUsage: cpuTotalUsage,
      perHourPrice: cpuPerHourPrice,
      totalPrice: cpuTotalPrice
    },
    memory: {
      totalUsage: memoryTotalUsage,
      perHourPrice: memoryPerHourPrice,
      totalPrice: memoryTotalPrice
    },
    network: {
      totalUsage: networkTotalUsage,
      perHourPrice: networkPerHourPrice,
      totalPrice: networkTotalPrice
    },
    storage: {
      totalUsage: storageTotalUsage,
      perHourPrice: storagePerHourPrice,
      totalPrice: storageTotalPrice
    }
  };
  return costs;
}

export const generateMonths = (date, count) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  return Array(count)
    .fill(0)
    .map((x, i) => new Date(year, month - i))
    .map(d => d.toLocaleString("en", { month: "long", year: "numeric" }))
    .reverse();
};
