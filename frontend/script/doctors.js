let main_container=document.getElementById("main_container");

let min_date="";
document.addEventListener('DOMContentLoaded', function() {
    let dtToday = new Date();
    let month = dtToday.getMonth() + 1;
    let day = dtToday.getDate();
    let year = dtToday.getFullYear();
  
    if (month < 10)
      month = '0' + month.toString();
    if (day < 10)
      day = '0' + day.toString();
  
    min_date = year + '-' + month + '-' + day;
    // document.getElementById('inputdate').setAttribute('min', minDate);
  });

fetchDoctorsFn();

async function fetchDoctorsFn() {
    try {
        let res = await fetch("http://localhost:3100/doctors", {
            method: "GET",
            headers: {
                "Content-Type": "Application/json",
                authorization: sessionStorage.getItem("health_token")
            }
        })
        let fin = await res.json();
        if (res.status == 200) {
            renderDoctorsFn(fin.data);
        } else {
            alert(fin.msg);
            window.location.href = "../html/login.html";
        }
    } catch (error) {
        console.log(error.message);
        alert("Unable to get Doctor's");
    }
}


const description_obj = {
    "Cardiology": "Specializing in the prevention, diagnosis, and treatment of heart-related conditions and diseases, including issues with the cardiovascular system and blood vessels.",

    "Dermatology": "Focusing on the health and well-being of the skin, dermatologists diagnose and treat various skin conditions, such as acne, eczema, psoriasis, and perform skin cancer screenings.",

    "Endocrinology": "Dealing with the intricate balance of hormones in the body, endocrinologists diagnose and treat conditions related to the endocrine system, including diabetes, thyroid disorders, and hormonal imbalances.",

    "Gastroenterology": "Concentrating on the digestive system, gastroenterologists diagnose and treat conditions affecting the esophagus, stomach, intestines, liver, and pancreas, such as acid reflux, ulcers, and gastrointestinal cancers.",

    "Neurology": "Specializing in disorders of the nervous system, neurologists diagnose and treat conditions such as epilepsy, migraines, multiple sclerosis, Parkinson's disease, and other neurological disorders.",

    "Ophthalmology": "Focusing on eye health and vision care, ophthalmologists provide comprehensive eye exams, diagnose and treat eye diseases and conditions, and perform eye surgeries, including cataract removal and laser vision correction.",

    "Orthopedics": "Concentrating on the musculoskeletal system, orthopedic doctors diagnose and treat injuries and conditions affecting the bones, joints, ligaments, tendons, and muscles, including fractures, arthritis, and sports injuries.",

    "Pediatrics": "Specializing in the health and well-being of infants, children, and adolescents, pediatricians provide comprehensive medical care, including preventive care, immunizations, and treatment for common childhood illnesses.",

    "Psychiatry": "Focusing on mental health, psychiatrists diagnose and treat various mental disorders, including depression, anxiety disorders, bipolar disorder, schizophrenia, and provide therapy and medication management.",

    "Surgery": "Surgeons specialize in performing surgical procedures to treat various conditions and diseases, such as appendectomy, hernia repair, gallbladder removal, and other necessary surgeries to improve patients' health and well-being."
}



function renderDoctorsFn(arr) {

    main_container.innerHTML=null;
    let template_arr=arr.map((el)=>{
        return`        <div class="doctor_box">
        <div class="avatar_div"><img class="avatar" src=${el.gender=="male"?"https://media.istockphoto.com/id/1150502263/vector/doctor-icon-or-avatar-physician-with-stethoscope-medicine-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=bADu0CBwP4bDQrgIfRVjZ90RwKzTD5-MYqlFFnLD_c0=":"https://img.freepik.com/premium-vector/portrait-beautiful-doctor-woman-avatar-social-media-bright-vector-illustration_590570-4.jpg"} alt="doc_avatar"></div>
        <div class="name"><label for="">Name :</label>${el.name}</div>
        <div class="email"><label for="">Email :</label>${el.email}</div>
        <div class="specialization"><label for="">Specialization :</label>${el.doctor_specialization}</div>
        <div class="description">${description_obj[el.doctor_specialization]}</div>
        <div class="name"><label for="">Place :</label>${el.location}</div>
        <form class="appointment_form">
        <input name="date" class="date" type="date" placeholder="Select Date" required min=${min_date}><br>
    <select name="time_slot" class="time_slot" required><br>
        <option value="" selected disabled>Select time slot</option>
        <option value="8:00-8:30">8:00 AM to 8:30 AM</option>
        <option value="8:30-9:00">8:30 AM to 9:00 AM</option>
        <option value="9:00-9:30">9:00 AM to 9:30 AM</option>
        <option value="9:30-10:00">9:30 AM to 10:00 AM</option>
        <option value="10:00-10:30">10:00 AM to 10:30 AM</option>
        <option value="10:30-11:00">10:30 AM to 11:00 AM</option>
        <option value="11:00-11:30">11:00 AM to 11:30 AM</option>
        <option value="11:30-12:00">11:30 AM to 12:00 PM</option>

        <option value="14:00-14:30">2:00 PM to 2:30 PM</option>
        <option value="14:30-15:00">2:30 PM to 3:00 PM</option>
        <option value="15:00-15:30">3:00 PM to 3:30 PM</option>
        <option value="15:30-16:00">3:30 PM to 4:00 PM</option>
        <option value="16:00-16:30">4:00 PM to 4:30 PM</option>
        <option value="16:30-17:00">4:30 PM to 5:00 PM</option>
        <option value="17:00-17:30">5:00 PM to 5:30 PM</option>
        <option value="17:30-16:00">5:30 PM to 6:00 PM</option>
    </select>
    
    <button type="submit" class="btn" data-id=${el._id}>Book Appointment</button>
    </form>
    </div>`;
    })
    main_container.innerHTML=template_arr.join("");
    const all_forms=document.querySelectorAll(".appointment_form");
    for(let form of all_forms){
        form.addEventListener("submit",(event)=>{
            event.preventDefault();
            const id=event.target.querySelector(".btn").dataset.id;
            const date=event.target.querySelector(".date").value;
            const time_slot = event.target.querySelector(".time_slot").value;
        })
    }
}





