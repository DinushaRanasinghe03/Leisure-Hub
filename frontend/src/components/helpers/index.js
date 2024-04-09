const formatAmount = (amount) => {
    const numberAmount = parseFloat(amount);
  
    const options = {
      style: "decimal",
      useGrouping: true,
    };
    const formattedNumber = numberAmount.toLocaleString("en-US", options);
  
    return formattedNumber;
  };
  
  
  export { formatAmount };