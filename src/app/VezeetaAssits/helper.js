export const parseText = inputText => {
  const parsedArray = inputText.replace("[", "").replace("]", "").split(", ");
  return parsedArray;
}

export const contexts = [
  'greeting',
  'booking request',
  'symptoms definition', 
  'personal name', 
  'phone number',
  'location',  
  'time', 
  'gender', 
  'professional title', 
  'insurance company',
];

export const specialties = "['Allergy and Immunology', 'Andrology and Male Infertility', 'Audiology', 'Cardiology and Thoracic Surgery', 'Cardiology and Vascular Disease', 'Chest and Respiratory', 'Dentistry', 'Dermatology', 'Diabetes and Endocrinology', 'Diagnostic Radiology', 'Dietitian and Nutrition', 'Ear, Nose and Throat', 'Family Medicine', 'Gastroenterology and Endoscopy', 'General Practice', 'General Surgery', 'Geriatrics', 'Gynaecology and Infertility', 'Hematology', 'Hepatology', 'Internal Medicine', 'IVF and Infertility', 'Laboratories', 'Nephrology', 'Neurology', 'Neurosurgery', 'Obesity and Laparoscopic Surgery', 'Oncology', 'Oncology Surgery', 'Ophthalmology', 'Orthopedics', 'Osteopathy', 'Pain Management', 'Pediatric Surgery', 'Pediatrics and New Born', 'Phoniatrics', 'Physiotherapy and Sport Injuries', 'Plastic Surgery', 'Psychiatry', 'Rheumatology', 'Spinal Surgery', 'Urology', 'Vascular Surgery']";

export const reservatioTemplate = "Mediacal Specialty: {specialty} \nPersonal Name: {personal_name}\nPhone number: {phone_number}\nArea: {area}\nReservation date: {date}\nGender{gender}\nProfessiona title: {professional_title}\nInsurance:{insurance_company} \n";
