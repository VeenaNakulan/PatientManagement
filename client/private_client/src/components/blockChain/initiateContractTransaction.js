const initiateContractTransaction = async ({ contractFunction, address }) => {
  const transactionInput = {
    from: address,
  };

  let result = null;

  try {
    result = await contractFunction.send({
      ...transactionInput,
    });
  } catch (error) {
    console.error(error);
    alert(error);
  }

  if (!result || !result.status) {
    alert('ERROR');
    // showToaster('Error');
  }

  return result;
};

export default initiateContractTransaction;
