import { useState } from "react"
import "./../styles/sectionsStyle/contact-section.css"
import addresses from "./../../data/adresses.json"
import services from "./../../data/services.json"
import swines from "./../../data/swines.json"
import axios from "axios"
import Swal from "sweetalert2";


function alertMsg (iconTxt, titleTxt, txtText){
  Swal.fire({
    icon: iconTxt,
    title: titleTxt,
    text: txtText,
  });
}

// Wag mo na abaguhin yung styles hahaha nahirapan ako ibalik daming nabago sa css

function ContactSection(){
  // Swine Information:
  const [appointmentTitle, setAppointmentTitle] = useState("");
  const [swineType, setSwineType] = useState("");
  const [swineCount, setSwineCount] = useState("");
  const [appointmentDate, setSchedule] = useState("Date");
  const [appointmentTime, setTime] = useState("Time");
  const [swineSymptoms, setSwineSymptoms] = useState("");
  const [swineAge, setSwineAge] = useState("");
  const [swineMale, setSwineMale] = useState("");
  const [swineFemale, setSwineFemale] = useState("");

  // Client Information:
  const [municipality, setSelectedMunicipality] = useState("");
  const [barangays, setBarangays] = useState([]);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientContact, setClientContact] = useState("");
  const appointmentStatus = "pending";
  const [loading, setLoading] = useState(false); 

  
  // Handle Municipality Change
  const handleMunicipalityChange = (event) => {
    const municipality = event.target.value;
    setSelectedMunicipality(municipality);
    setBarangays(addresses.Municipals[municipality] || []);
  };

  const handleAppointmentChange = (event) => {
    const service = event.target.value;
    setAppointmentTitle(service);
  };

  const handleSwineChange = (event) => {
    const swine = event.target.value;
    setSwineType(swine);
  };

  const swineValidation = parseInt(swineCount) === (parseInt(swineMale) + parseInt(swineFemale)); //Check if the number of swine and gender number is equal

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if any field is empty
    if (
      !appointmentTitle ||
      !swineType ||
      !swineCount ||
      !appointmentDate ||
      !appointmentTime ||
      !swineSymptoms||
      !swineAge||
      !swineMale||
      !swineFemale||
      !municipality ||
      !e.target.barangay.value ||
      !clientName ||
      !clientEmail ||
      !clientContact
    ) {
      const icon = 'warning';
      const title = 'Missing Fields';
      const text= 'Please fill out all the fields before submitting.';
      alertMsg(icon, title, text);
    setLoading(false);
    return; // Prevent the request from being sent
  }
  if (!swineValidation) {
    const icon = 'warning';
    const title = 'Invalid Input';
    const text = 'Please check if your number of swine and genders are correct';
    alertMsg(icon, title, text);
    setLoading(false);
    return; // Prevent the request from being sent
  }

    const appointmentData = {
      appointmentTitle,
      swineType,
      swineCount,
      appointmentDate,
      appointmentTime,
      swineSymptoms,
      swineAge,
      swineMale,
      swineFemale,
      appointmentStatus,
      municipality,
      barangay: e.target.barangay.value,
      clientName,
      clientEmail,
      clientContact
    };

    axios.post('http://localhost:3000/appointment', appointmentData)
  .then(result => {
    setLoading(false);
    Swal.fire({
      icon: 'success',
      title: 'Appointment Sent',
      text: 'Appointment sent successfully!',
    }).then(() => {
      window.location.reload(); // Reload the page
    });

  })
  .catch(err => {
    setLoading(false);
    console.log(err);
    const icon = 'error';
    const title = 'Appointment Sending Failed';
    const text = 'Appointment was not sent!';
    alertMsg(icon, title, text);

     // Check if it's a 429 error (rate limit reached)
     if (err.response && err.response.status === 429) {
      const icon = 'warning';
      const title = 'Rate Limit Exceeded';
      const text = 'Too many requests. Please try again later.';
      alertMsg(icon, title, text);
    } else {
      const icon = 'error';
      const title = 'Appointment Sending Failed';
      const text = 'Appointment was not sent!';
      alertMsg(icon, title, text);
    }
  });

  console.log("Appointment Data Submitted:", appointmentData);
  };

  return(
    <section id="contact-section">
      <div className="info-container">
        <h1 className="section-heading">Our Priority is to <br />
            Ensure the Good <br />
            Health of your <br />
            Swine
        </h1>
        <p className="inform-txt">Always be informed and updated to the <br /> services  we provide by joining our community.</p>
        <button className="join-btn">Join Now!</button>
      </div>

      <form action="" className="appointment-form" onSubmit={handleSubmit} >
        <h3 className="heading">Send Your Appointment</h3>
        <p className="reminder-txt">Please ensure all text fields are properly filled out before submitting your appointment request.</p>

        <p className="text-header">Swine Information:</p>

        {/* {Select appointment and Appointment type} */}
        <div className="group">
          <select id="appointment" name="appointment" onChange={handleAppointmentChange}>
            <option value="">Select Appointment</option>
            {services.Services.appointmentServices.map((service, index) => (
              <option key={index} value={service.toLowerCase()}>{service}</option>
            ))}
          </select>
          <select id="pig-type" name="pig-type" onChange={handleSwineChange}>
            <option value="">Swine Type</option>
            {swines.SwineType.swines.map((swine, index) => (
                <option key={index} value={swine.toLowerCase()}>{swine}</option>
              ))}
          </select>
        </div>
     
        {/* Schedule, Time and Heads */}
        {/* boi binalik ko yung label ng time at day wag mo na abaguhin */}
        <div className="group schedule-time-heads">
          <label htmlFor="#appointment-schedule">
            <p className="txt-label">{appointmentDate}</p>
            <input type="date" id="appointment-schedule" name="schedule" onChange={(e) => setSchedule(e.target.value)} />
          </label>
          <label htmlFor="#time">
            <p className="txt-label">{appointmentTime}</p>
            <input type="time" id="time" name="time" onChange={(e) => setTime(e.target.value)} />
          </label>  
          <input type="number" placeholder="Heads" value={swineCount} onChange={(e) => setSwineCount(e.target.value)} required/>   
        </div>

        {/* symptoms text-area */}
        <textarea className="symptoms-txt-erea" id="symptoms" required placeholder="Kindly write down the Note or Symptoms of your swines" onChange={(e) => setSwineSymptoms(e.target.value)}></textarea>       

        {/* Swine Genders and Swine age  */}
        <p className="text-header">Swine Gender:</p>
        <div className="group">
          <div className="swine-genders">
            <label htmlFor="male">
              Male
              <input type="number" name="male" id="male" min={0} placeholder="0" onChange={(e) => setSwineMale(e.target.value)} required/>
            </label>     
            <label htmlFor="female">
              Female
              <input type="number" name="female" id="female" min={0} placeholder="0" onChange={(e) => setSwineFemale(e.target.value)} required/>
            </label>         
          </div>
            <label htmlFor="swine-age">
              Swine Age:
              <input type="number" min={0} name="swine-age" id="swine-age" placeholder="months old" required onChange={(e) => setSwineAge(e.target.value)}/>
            </label>      
        </div>

        <p className="text-header">Client Information:</p>
        <div className="group">
          {/* Municipality Selection */}
          <select id="municipality" name="municipality" onChange={handleMunicipalityChange}>
            <option value="">Select Municipality</option>
            {Object.keys(addresses.Municipals).map((municipality) => (
              <option key={municipality} value={municipality}>
                {municipality}
              </option>
            ))}
          </select>

          {/* Barangay Selection */}
          {/* binago ko ulit ito, dapat naka disable ang select kapag walang selected na municipal */}
          <select id="barangay" name="barangay" disabled={!municipality}>
            <option value="">Barangay</option>
            {barangays.map((barangay) => (
              <option key={barangay} value={barangay}>
                {barangay}
              </option>
            ))}
          </select>
        </div>

        <input type="text" id="full-name" name="full-name" placeholder="Full Name" onChange={(e) => setClientName(e.target.value)}/>
        <input type="email" id="email" name="email" placeholder="Email" onChange={(e) => setClientEmail(e.target.value)}/>
        <input type="tel" id="phone" name="phone" maxLength="11" placeholder="Phone" onChange={(e) => setClientContact(e.target.value)}/>

        {loading && <div className="loader"></div>}

        {/* <button type="submit" className="submit-btn">Request Appointment</button> */}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Submitting..." : "Request Appointment"}
        </button>

      </form>
    </section>
  )
}


export default ContactSection