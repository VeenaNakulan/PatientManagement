import CONSULTATION_ABI from './Consultation_ABI';

const consultationCertificateVerificationFunction = async ({
  web3,
  certificateNumber,
}) => {
  const tokenAddress = '0xb85987bd100b2B211aD81A785E6a76592Fc29b60';

  try {
    const smartContract = await new web3.eth.Contract(
      CONSULTATION_ABI,
      tokenAddress
    );

    const result = await smartContract.methods
      .verifyCertificateByCertificate(certificateNumber)
      .call();
    const certificatenumber = result.certificateNumber;
    const patientName = web3.utils.hexToUtf8(result.patientName);
    const patientUUID = web3.utils.hexToUtf8(result.patientUUID);
    const patientRegId = result.patientRegId;
    const doctorName = web3.utils.hexToUtf8(result.doctorName);
    const endTimestamp = result.consultationTime;
    const startTimestamp = result.issuedDateTime;
    const startDate = new Date(startTimestamp * 1000);
    const startHours = startDate.getHours();
    const startAMPM = startHours >= 12 ? 'PM' : 'AM';

    const endDate = new Date(endTimestamp * 1000);
    const endHours = endDate.getHours();
    const endAMPM = endHours >= 12 ? 'PM' : 'AM';
    const consultationTime = endHours + ':00' + endAMPM;
    const departmentName = web3.utils.hexToUtf8(result.departmentName);
    const issuerName = web3.utils.hexToUtf8(result.issuerName);
    const issuerId = web3.utils.hexToUtf8(result.issuerId);
    const issuedDateTime = startAMPM;
    const hospitalName = web3.utils.hexToUtf8(result.hospitalName);

    const decoded = {
      certificatenumber,
      patientName,
      patientUUID,
      patientRegId,
      doctorName,
      consultationTime,
      departmentName,
      hospitalName,
      issuerName,
      issuerId,
      issuedDateTime,
    };
    return decoded;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default consultationCertificateVerificationFunction;
