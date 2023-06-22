let main_container=document.getElementById("main_container");


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
        <button class="btn" data-id=${el._id}>Book Appointment</button>
    </div>`;
    })
    main_container.innerHTML=template_arr.join("");
}