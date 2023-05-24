import VACCINATION_ABI from './Vaccination_ABI';

const certificateVerificationFunction = async ({ web3, certificateNumber }) => {
  const tokenAddress = '0x535Ac607e72146218Bc5e7d3b71a37944a77025C';

  try {
    const smartContract = await new web3.eth.Contract(
      VACCINATION_ABI,
      tokenAddress
    );

    const result = await smartContract.methods
      .verifyCertificateByCertificate(certificateNumber)
      .call();

    const certificatenumber = result.certificateNumber;
    const patientName = web3.utils.hexToUtf8(result.patientName);
    const patientUUID = web3.utils.hexToUtf8(result.patientUUID);
    const patientRegId = result.patientRegId;
    const vaccineName = web3.utils.hexToUtf8(result.vaccineName);
    const endTimestamp = result.vaccineTakenDatetime;
    const startTimestamp = result.issuedDateTime;
    const startDate = new Date(startTimestamp * 1000);
    const startHours = startDate.getHours();
    const startAMPM = startHours >= 12 ? 'PM' : 'AM';

    const endDate = new Date(endTimestamp * 1000);
    const endHours = endDate.getHours();
    const endAMPM = endHours >= 12 ? 'PM' : 'AM';
    const vaccineTakenDatetime = endHours + ':00' + endAMPM;
    const disease = web3.utils.hexToUtf8(result.disease);
    const issuerName = web3.utils.hexToUtf8(result.issuerName);
    const issuerId = web3.utils.hexToUtf8(result.issuerId);
    const issuedDateTime = startAMPM;
    const antigen = web3.utils.hexToUtf8(result.antigen);

    const decoded = {
      certificatenumber,
      patientName,
      patientUUID,
      patientRegId,
      vaccineName,
      vaccineTakenDatetime,
      disease,
      antigen,
      issuerName,
      issuerId,
      issuedDateTime,
    };
    console.log(decoded);
    return decoded;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default certificateVerificationFunction;
