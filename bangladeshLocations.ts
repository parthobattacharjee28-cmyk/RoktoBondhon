import { Division, District } from '../types';

export const BANGLADESH_DIVISIONS: Division[] = [
  { id: 'dhaka', nameEn: 'Dhaka', nameBn: 'ঢাকা', donorCount: 4280 },
  { id: 'chittagong', nameEn: 'Chittagong', nameBn: 'চট্টগ্রাম', donorCount: 3120 },
  { id: 'rajshahi', nameEn: 'Rajshahi', nameBn: 'রাজশাহী', donorCount: 1840 },
  { id: 'khulna', nameEn: 'Khulna', nameBn: 'খুলনা', donorCount: 1650 },
  { id: 'barisal', nameEn: 'Barisal', nameBn: 'বরিশাল', donorCount: 920 },
  { id: 'sylhet', nameEn: 'Sylhet', nameBn: 'সিলেট', donorCount: 1410 },
  { id: 'rangpur', nameEn: 'Rangpur', nameBn: 'রংপুর', donorCount: 1290 },
  { id: 'mymensingh', nameEn: 'Mymensingh', nameBn: 'ময়মনসিংহ', donorCount: 1080 },
];

export const BANGLADESH_DISTRICTS: District[] = [
  // --- DHAKA DIVISION (13 Districts) ---
  {
    id: 'dhaka',
    divisionId: 'dhaka',
    nameEn: 'Dhaka',
    nameBn: 'ঢাকা',
    upazilas: [
      { id: 'dhanmondi', nameEn: 'Dhanmondi', nameBn: 'ধানমন্ডি' },
      { id: 'mirpur', nameEn: 'Mirpur', nameBn: 'মিরপুর' },
      { id: 'uttara', nameEn: 'Uttara', nameBn: 'উত্তরা' },
      { id: 'gulshan', nameEn: 'Gulshan / Banani', nameBn: 'গুলশান / বনানী' },
      { id: 'mohammadpur', nameEn: 'Mohammadpur', nameBn: 'মোহাম্মদপুর' },
      { id: 'motijheel', nameEn: 'Motijheel / Paltan', nameBn: 'মতিঝিল / পল্টন' },
      { id: 'shahbagh', nameEn: 'Shahbagh / Ramna', nameBn: 'শাহবাগ / রমনা' },
      { id: 'savar', nameEn: 'Savar', nameBn: 'সাভার' },
      { id: 'dhamrai', nameEn: 'Dhamrai', nameBn: 'ধামরাই' },
      { id: 'keraniganj', nameEn: 'Keraniganj', nameBn: 'কেরানীগঞ্জ' },
      { id: 'jatrabari', nameEn: 'Jatrabari', nameBn: 'যাত্রাবাড়ী' },
      { id: 'badda', nameEn: 'Badda / Rampura', nameBn: 'বাড্ডা / রামপুরা' },
    ],
  },
  {
    id: 'gazipur',
    divisionId: 'dhaka',
    nameEn: 'Gazipur',
    nameBn: 'গাজীপুর',
    upazilas: [
      { id: 'gazipur-sadar', nameEn: 'Gazipur Sadar', nameBn: 'গাজীপুর সদর' },
      { id: 'kaliakair', nameEn: 'Kaliakair', nameBn: 'কালিয়াকৈর' },
      { id: 'kaliganj-gazi', nameEn: 'Kaliganj', nameBn: 'কালীগঞ্জ' },
      { id: 'kapasia', nameEn: 'Kapasia', nameBn: 'কাপাসিয়া' },
      { id: 'sreepur', nameEn: 'Sreepur', nameBn: 'শ্রীপুর' },
      { id: 'tongi', nameEn: 'Tongi', nameBn: 'টঙ্গী' },
    ],
  },
  {
    id: 'narayanganj',
    divisionId: 'dhaka',
    nameEn: 'Narayanganj',
    nameBn: 'নারায়ণগঞ্জ',
    upazilas: [
      { id: 'narayanganj-sadar', nameEn: 'Narayanganj Sadar', nameBn: 'নারায়ণগঞ্জ সদর' },
      { id: 'araihazar', nameEn: 'Araihazar', nameBn: 'আড়াইহাজার' },
      { id: 'bandar', nameEn: 'Bandar', nameBn: 'বন্দর' },
      { id: 'rupganj', nameEn: 'Rupganj', nameBn: 'রূপগঞ্জ' },
      { id: 'sonargaon', nameEn: 'Sonargaon', nameBn: 'সোনারগাঁও' },
    ],
  },
  {
    id: 'tangail',
    divisionId: 'dhaka',
    nameEn: 'Tangail',
    nameBn: 'টাঙ্গাইল',
    upazilas: [
      { id: 'tangail-sadar', nameEn: 'Tangail Sadar', nameBn: 'টাঙ্গাইল সদর' },
      { id: 'ghatail', nameEn: 'Ghatail', nameBn: 'ঘাটাইল' },
      { id: 'kalihati', nameEn: 'Kalihati', nameBn: 'কালিহাতী' },
      { id: 'madhupur', nameEn: 'Madhupur', nameBn: 'মধুপুর' },
      { id: 'mirzapur', nameEn: 'Mirzapur', nameBn: 'মির্জাপুর' },
      { id: 'sakhipur', nameEn: 'Sakhipur', nameBn: 'সখিপুর' },
    ],
  },
  {
    id: 'faridpur',
    divisionId: 'dhaka',
    nameEn: 'Faridpur',
    nameBn: 'ফরিদপুর',
    upazilas: [
      { id: 'faridpur-sadar', nameEn: 'Faridpur Sadar', nameBn: 'ফরিদপুর সদর' },
      { id: 'bhanga', nameEn: 'Bhanga', nameBn: 'ভাঙ্গা' },
      { id: 'boalmari', nameEn: 'Boalmari', nameBn: 'বোয়ালমারী' },
      { id: 'sadarpur', nameEn: 'Sadarpur', nameBn: 'সদরপুর' },
    ],
  },
  {
    id: 'kishoreganj',
    divisionId: 'dhaka',
    nameEn: 'Kishoreganj',
    nameBn: 'কিশোরগঞ্জ',
    upazilas: [
      { id: 'kishoreganj-sadar', nameEn: 'Kishoreganj Sadar', nameBn: 'কিশোরগঞ্জ সদর' },
      { id: 'bhairab', nameEn: 'Bhairab', nameBn: 'ভৈরব' },
      { id: 'bajitpur', nameEn: 'Bajitpur', nameBn: 'বাজিতপুর' },
      { id: 'karimganj', nameEn: 'Karimganj', nameBn: 'করিমগঞ্জ' },
    ],
  },
  {
    id: 'manikganj',
    divisionId: 'dhaka',
    nameEn: 'Manikganj',
    nameBn: 'মানিকগঞ্জ',
    upazilas: [
      { id: 'manikganj-sadar', nameEn: 'Manikganj Sadar', nameBn: 'মানিকগঞ্জ সদর' },
      { id: 'singair', nameEn: 'Singair', nameBn: 'সিংগাইর' },
      { id: 'shibalaya', nameEn: 'Shibalaya', nameBn: 'শিবালয়' },
    ],
  },
  {
    id: 'munshiganj',
    divisionId: 'dhaka',
    nameEn: 'Munshiganj',
    nameBn: 'মুন্সীগঞ্জ',
    upazilas: [
      { id: 'munshiganj-sadar', nameEn: 'Munshiganj Sadar', nameBn: 'মুন্সীগঞ্জ সদর' },
      { id: 'sreenagar', nameEn: 'Sreenagar', nameBn: 'শ্রীনগর' },
      { id: 'gazaria', nameEn: 'Gazaria', nameBn: 'গজারিয়া' },
    ],
  },
  {
    id: 'narsingdi',
    divisionId: 'dhaka',
    nameEn: 'Narsingdi',
    nameBn: 'নরসিংদী',
    upazilas: [
      { id: 'narsingdi-sadar', nameEn: 'Narsingdi Sadar', nameBn: 'নরসিংদী সদর' },
      { id: 'palash', nameEn: 'Palash', nameBn: 'পলাশ' },
      { id: 'shibpur', nameEn: 'Shibpur', nameBn: 'শিবপুর' },
      { id: 'raipura', nameEn: 'Raipura', nameBn: 'রায়পুরা' },
    ],
  },
  {
    id: 'gopalganj',
    divisionId: 'dhaka',
    nameEn: 'Gopalganj',
    nameBn: 'গোপালগঞ্জ',
    upazilas: [
      { id: 'gopalganj-sadar', nameEn: 'Gopalganj Sadar', nameBn: 'গোপালগঞ্জ সদর' },
      { id: 'kashiani', nameEn: 'Kashiani', nameBn: 'কাশিয়ানী' },
      { id: 'tungipara', nameEn: 'Tungipara', nameBn: 'টুঙ্গিপাড়া' },
    ],
  },
  {
    id: 'madaripur',
    divisionId: 'dhaka',
    nameEn: 'Madaripur',
    nameBn: 'মাদারীপুর',
    upazilas: [
      { id: 'madaripur-sadar', nameEn: 'Madaripur Sadar', nameBn: 'মাদারীপুর সদর' },
      { id: 'shibchar', nameEn: 'Shibchar', nameBn: 'শিবচর' },
      { id: 'kalkini', nameEn: 'Kalkini', nameBn: 'কালকিনি' },
    ],
  },
  {
    id: 'rajbari',
    divisionId: 'dhaka',
    nameEn: 'Rajbari',
    nameBn: 'রাজবাড়ী',
    upazilas: [
      { id: 'rajbari-sadar', nameEn: 'Rajbari Sadar', nameBn: 'রাজবাড়ী সদর' },
      { id: 'pangsha', nameEn: 'Pangsha', nameBn: 'পাংশা' },
      { id: 'goalanda', nameEn: 'Goalanda', nameBn: 'গোয়ালন্দ' },
    ],
  },
  {
    id: 'shariatpur',
    divisionId: 'dhaka',
    nameEn: 'Shariatpur',
    nameBn: 'শরীয়তপুর',
    upazilas: [
      { id: 'shariatpur-sadar', nameEn: 'Shariatpur Sadar', nameBn: 'শরীয়তপুর সদর' },
      { id: 'damudya', nameEn: 'Damudya', nameBn: 'ডামুড্যা' },
      { id: 'naria', nameEn: 'Naria', nameBn: 'নড়িয়া' },
      { id: 'zajira', nameEn: 'Zajira', nameBn: 'জাজিরা' },
    ],
  },

  // --- CHITTAGONG DIVISION (11 Districts) ---
  {
    id: 'chittagong',
    divisionId: 'chittagong',
    nameEn: 'Chittagong',
    nameBn: 'চট্টগ্রাম',
    upazilas: [
      { id: 'kotwali-ctg', nameEn: 'Kotwali', nameBn: 'কোতোয়ালী' },
      { id: 'panchlaish', nameEn: 'Panchlaish', nameBn: 'পাঁচলাইশ' },
      { id: 'halishahar', nameEn: 'Halishahar', nameBn: 'হালিশহর' },
      { id: 'khulshi', nameEn: 'Khulshi', nameBn: 'খুলশী' },
      { id: 'hathazari', nameEn: 'Hathazari', nameBn: 'হাটহাজারী' },
      { id: 'patia', nameEn: 'Patiya', nameBn: 'পটিয়া' },
      { id: 'sitakunda', nameEn: 'Sitakunda', nameBn: 'সীতাকুণ্ড' },
      { id: 'mirsharai', nameEn: 'Mirsharai', nameBn: 'মীরসরাই' },
      { id: 'chandanaish', nameEn: 'Chandanaish', nameBn: 'চন্দনাইশ' },
      { id: 'boalkhali', nameEn: 'Boalkhali', nameBn: 'বোয়ালখালী' },
      { id: 'raozan', nameEn: 'Raozan', nameBn: 'রাউজান' },
    ],
  },
  {
    id: 'coxsbazar',
    divisionId: 'chittagong',
    nameEn: "Cox's Bazar",
    nameBn: 'কক্সবাজার',
    upazilas: [
      { id: 'coxsbazar-sadar', nameEn: "Cox's Bazar Sadar", nameBn: 'কক্সবাজার সদর' },
      { id: 'chakaria', nameEn: 'Chakaria', nameBn: 'চকোরিয়া' },
      { id: 'teknaf', nameEn: 'Teknaf', nameBn: 'টেকনাফ' },
      { id: 'ramu', nameEn: 'Ramu', nameBn: 'রামু' },
      { id: 'ukhiya', nameEn: 'Ukhiya', nameBn: 'উখিয়া' },
    ],
  },
  {
    id: 'comilla',
    divisionId: 'chittagong',
    nameEn: 'Cumilla',
    nameBn: 'কুমিল্লা',
    upazilas: [
      { id: 'comilla-sadar', nameEn: 'Cumilla Sadar', nameBn: 'কুমিল্লা সদর' },
      { id: 'daudkandi', nameEn: 'Daudkandi', nameBn: 'দাউদকান্দি' },
      { id: 'laksham', nameEn: 'Laksham', nameBn: 'লাকসাম' },
      { id: 'chandina', nameEn: 'Chandina', nameBn: 'চান্দিনা' },
      { id: 'debidwar', nameEn: 'Debidwar', nameBn: 'দেবিদ্বার' },
    ],
  },
  {
    id: 'feni',
    divisionId: 'chittagong',
    nameEn: 'Feni',
    nameBn: 'ফেনী',
    upazilas: [
      { id: 'feni-sadar', nameEn: 'Feni Sadar', nameBn: 'ফেনী সদর' },
      { id: 'chhagalnaiya', nameEn: 'Chhagalnaiya', nameBn: 'ছাগলনাইয়া' },
      { id: 'daganbhuiyan', nameEn: 'Daganbhuiyan', nameBn: 'দাগনভূঞা' },
      { id: 'parshuram', nameEn: 'Parshuram', nameBn: 'পরশুরাম' },
    ],
  },
  {
    id: 'brahmanbaria',
    divisionId: 'chittagong',
    nameEn: 'Brahmanbaria',
    nameBn: 'ব্রাহ্মণবাড়িয়া',
    upazilas: [
      { id: 'brahmanbaria-sadar', nameEn: 'Brahmanbaria Sadar', nameBn: 'ব্রাহ্মণবাড়িয়া সদর' },
      { id: 'ashuganj', nameEn: 'Ashuganj', nameBn: 'আশুগঞ্জ' },
      { id: 'bancharampur', nameEn: 'Bancharampur', nameBn: 'বাঞ্ছারামপুর' },
      { id: 'kasba', nameEn: 'Kasba', nameBn: 'কসবা' },
      { id: 'nabinagar', nameEn: 'Nabinagar', nameBn: 'নবীনগর' },
    ],
  },
  {
    id: 'noakhali',
    divisionId: 'chittagong',
    nameEn: 'Noakhali',
    nameBn: 'নোয়াখালী',
    upazilas: [
      { id: 'noakhali-sadar', nameEn: 'Noakhali Sadar', nameBn: 'নোয়াখালী সদর' },
      { id: 'begumganj', nameEn: 'Begumganj', nameBn: 'বেগমগঞ্জ' },
      { id: 'chatkhil', nameEn: 'Chatkhil', nameBn: 'চাটখিল' },
      { id: 'companiganj-noa', nameEn: 'Companiganj', nameBn: 'কোম্পানীগঞ্জ' },
      { id: 'senbagh', nameEn: 'Senbagh', nameBn: 'সেনবাগ' },
    ],
  },
  {
    id: 'chandpur',
    divisionId: 'chittagong',
    nameEn: 'Chandpur',
    nameBn: 'চাঁদপুর',
    upazilas: [
      { id: 'chandpur-sadar', nameEn: 'Chandpur Sadar', nameBn: 'চাঁদপুর সদর' },
      { id: 'faridganj', nameEn: 'Faridganj', nameBn: 'ফরিদগঞ্জ' },
      { id: 'hajiganj', nameEn: 'Hajiganj', nameBn: 'হাজীগঞ্জ' },
      { id: 'matlab-dakshin', nameEn: 'Matlab South', nameBn: 'মতলব দক্ষিণ' },
    ],
  },
  {
    id: 'lakshmipur',
    divisionId: 'chittagong',
    nameEn: 'Lakshmipur',
    nameBn: 'লক্ষ্মীপুর',
    upazilas: [
      { id: 'lakshmipur-sadar', nameEn: 'Lakshmipur Sadar', nameBn: 'লক্ষ্মীপুর সদর' },
      { id: 'raipur', nameEn: 'Raipur', nameBn: 'রায়পুর' },
      { id: 'ramganj', nameEn: 'Ramganj', nameBn: 'রামগঞ্জ' },
    ],
  },
  {
    id: 'rangamati',
    divisionId: 'chittagong',
    nameEn: 'Rangamati',
    nameBn: 'রাঙ্গামাটি',
    upazilas: [
      { id: 'rangamati-sadar', nameEn: 'Rangamati Sadar', nameBn: 'রাঙ্গামাটি সদর' },
      { id: 'kaptai', nameEn: 'Kaptai', nameBn: 'কাপ্তাই' },
      { id: 'baghaichhari', nameEn: 'Baghaichhari', nameBn: 'বাঘাইছড়ি' },
    ],
  },
  {
    id: 'khagrachhari',
    divisionId: 'chittagong',
    nameEn: 'Khagrachhari',
    nameBn: 'খাগড়াছড়ি',
    upazilas: [
      { id: 'khagrachhari-sadar', nameEn: 'Khagrachhari Sadar', nameBn: 'খাগড়াছড়ি সদর' },
      { id: 'dighinala', nameEn: 'Dighinala', nameBn: 'দীঘিনালা' },
      { id: 'panchhari', nameEn: 'Panchhari', nameBn: 'পানছড়ি' },
    ],
  },
  {
    id: 'bandarban',
    divisionId: 'chittagong',
    nameEn: 'Bandarban',
    nameBn: 'বান্দরবান',
    upazilas: [
      { id: 'bandarban-sadar', nameEn: 'Bandarban Sadar', nameBn: 'বান্দরবান সদর' },
      { id: 'lama', nameEn: 'Lama', nameBn: 'লামা' },
      { id: 'roangchhari', nameEn: 'Roangchhari', nameBn: 'রোয়াংছড়ি' },
    ],
  },

  // --- RAJSHAHI DIVISION (8 Districts) ---
  {
    id: 'rajshahi',
    divisionId: 'rajshahi',
    nameEn: 'Rajshahi',
    nameBn: 'রাজশাহী',
    upazilas: [
      { id: 'boalia', nameEn: 'Boalia / Rajshahi City', nameBn: 'বোয়ালিয়া / রাজশাহী সিটি' },
      { id: 'motihar', nameEn: 'Motihar', nameBn: 'মতিহার' },
      { id: 'rajpara', nameEn: 'Rajpara', nameBn: 'রাজপাড়া' },
      { id: 'godagari', nameEn: 'Godagari', nameBn: 'গোদাগাড়ী' },
      { id: 'paba', nameEn: 'Paba', nameBn: 'পবা' },
      { id: 'bagha', nameEn: 'Bagha', nameBn: 'বাঘা' },
    ],
  },
  {
    id: 'bogra',
    divisionId: 'rajshahi',
    nameEn: 'Bogura',
    nameBn: 'বগুড়া',
    upazilas: [
      { id: 'bogra-sadar', nameEn: 'Bogura Sadar', nameBn: 'বগুড়া সদর' },
      { id: 'shajahanpur', nameEn: 'Shajahanpur', nameBn: 'শাজাহানপুর' },
      { id: 'sherpur-bogra', nameEn: 'Sherpur', nameBn: 'শেরপুর' },
      { id: 'shibganj-bogra', nameEn: 'Shibganj', nameBn: 'শিবগঞ্জ' },
    ],
  },
  {
    id: 'pabna',
    divisionId: 'rajshahi',
    nameEn: 'Pabna',
    nameBn: 'পাবনা',
    upazilas: [
      { id: 'pabna-sadar', nameEn: 'Pabna Sadar', nameBn: 'পাবনা সদর' },
      { id: 'ishwardi', nameEn: 'Ishwardi', nameBn: 'ঈশ্বরদী' },
      { id: 'beraa', nameEn: 'Bera', nameBn: 'বেড়া' },
      { id: 'santhia', nameEn: 'Santhia', nameBn: 'সাঁথিয়া' },
    ],
  },
  {
    id: 'sirajganj',
    divisionId: 'rajshahi',
    nameEn: 'Sirajganj',
    nameBn: 'সিরাজগঞ্জ',
    upazilas: [
      { id: 'sirajganj-sadar', nameEn: 'Sirajganj Sadar', nameBn: 'সিরাজগঞ্জ সদর' },
      { id: 'shahjadpur', nameEn: 'Shahjadpur', nameBn: 'শাহজাদপুর' },
      { id: 'ullapara', nameEn: 'Ullapara', nameBn: 'উল্লাপাড়া' },
      { id: 'belkuchi', nameEn: 'Belkuchi', nameBn: 'বেলকুচি' },
    ],
  },
  {
    id: 'naogaon',
    divisionId: 'rajshahi',
    nameEn: 'Naogaon',
    nameBn: 'নওগাঁ',
    upazilas: [
      { id: 'naogaon-sadar', nameEn: 'Naogaon Sadar', nameBn: 'নওগাঁ সদর' },
      { id: 'patnitala', nameEn: 'Patnitala', nameBn: 'পত্নীতলা' },
      { id: 'manda', nameEn: 'Manda', nameBn: 'মান্দা' },
    ],
  },
  {
    id: 'natore',
    divisionId: 'rajshahi',
    nameEn: 'Natore',
    nameBn: 'নাটোর',
    upazilas: [
      { id: 'natore-sadar', nameEn: 'Natore Sadar', nameBn: 'নাটোর সদর' },
      { id: 'singra', nameEn: 'Singra', nameBn: 'সিংড়া' },
      { id: 'baraigram', nameEn: 'Baraigram', nameBn: 'বড়াইগ্রাম' },
    ],
  },
  {
    id: 'chapai-nawabganj',
    divisionId: 'rajshahi',
    nameEn: 'Chapai Nawabganj',
    nameBn: 'চাঁপাইনবাবগঞ্জ',
    upazilas: [
      { id: 'chapai-sadar', nameEn: 'Nawabganj Sadar', nameBn: 'নবাবগঞ্জ সদর' },
      { id: 'shibganj-chapai', nameEn: 'Shibganj', nameBn: 'শিবগঞ্জ' },
      { id: 'gomastapur', nameEn: 'Gomastapur', nameBn: 'গোমস্তাপুর' },
    ],
  },
  {
    id: 'joypurhat',
    divisionId: 'rajshahi',
    nameEn: 'Joypurhat',
    nameBn: 'জয়পুরহাট',
    upazilas: [
      { id: 'joypurhat-sadar', nameEn: 'Joypurhat Sadar', nameBn: 'জয়পুরহাট সদর' },
      { id: 'panchbibi', nameEn: 'Panchbibi', nameBn: 'পাঁচবিবি' },
      { id: 'kalai', nameEn: 'Kalai', nameBn: 'কালাই' },
    ],
  },

  // --- KHULNA DIVISION (10 Districts) ---
  {
    id: 'khulna',
    divisionId: 'khulna',
    nameEn: 'Khulna',
    nameBn: 'খুলনা',
    upazilas: [
      { id: 'khulna-sadar', nameEn: 'Khulna Sadar', nameBn: 'খুলনা সদর' },
      { id: 'sonadanga', nameEn: 'Sonadanga', nameBn: 'সোনাডাঙ্গা' },
      { id: 'khalishpur', nameEn: 'Khalishpur', nameBn: 'খালিশপুর' },
      { id: 'daulatpur', nameEn: 'Daulatpur', nameBn: 'দৌলতপুর' },
      { id: 'dumuria', nameEn: 'Dumuria', nameBn: 'ডুমুরিয়া' },
      { id: 'rupa', nameEn: 'Rupsha', nameBn: 'রূপসা' },
    ],
  },
  {
    id: 'jessore',
    divisionId: 'khulna',
    nameEn: 'Jashore',
    nameBn: 'যশোর',
    upazilas: [
      { id: 'jashore-sadar', nameEn: 'Jashore Sadar', nameBn: 'যশোর সদর' },
      { id: 'jhikargachha', nameEn: 'Jhikargachha', nameBn: 'ঝিকরগাছা' },
      { id: 'manirampur', nameEn: 'Manirampur', nameBn: 'মণিরামপুর' },
      { id: 'keshabpur', nameEn: 'Keshabpur', nameBn: 'কেশবপুর' },
    ],
  },
  {
    id: 'kushtia',
    divisionId: 'khulna',
    nameEn: 'Kushtia',
    nameBn: 'কুষ্টিয়া',
    upazilas: [
      { id: 'kushtia-sadar', nameEn: 'Kushtia Sadar', nameBn: 'কুষ্টিয়া সদর' },
      { id: 'kumarkhali', nameEn: 'Kumarkhali', nameBn: 'কুমারখালী' },
      { id: 'bheramara', nameEn: 'Bheramara', nameBn: 'ভেড়ামারা' },
      { id: 'mirpur-kushtia', nameEn: 'Mirpur', nameBn: 'মিরপুর' },
    ],
  },
  {
    id: 'satkhira',
    divisionId: 'khulna',
    nameEn: 'Satkhira',
    nameBn: 'সাতক্ষীরা',
    upazilas: [
      { id: 'satkhira-sadar', nameEn: 'Satkhira Sadar', nameBn: 'সাতক্ষীরা সদর' },
      { id: 'kaliganj-sat', nameEn: 'Kaliganj', nameBn: 'কালীগঞ্জ' },
      { id: 'shyamnagar', nameEn: 'Shyamnagar', nameBn: 'শ্যামনগর' },
    ],
  },
  {
    id: 'bagerhat',
    divisionId: 'khulna',
    nameEn: 'Bagerhat',
    nameBn: 'বাগেরহাট',
    upazilas: [
      { id: 'bagerhat-sadar', nameEn: 'Bagerhat Sadar', nameBn: 'বাগেরহাট সদর' },
      { id: 'mongla', nameEn: 'Mongla', nameBn: 'মোংলা' },
      { id: 'morrelganj', nameEn: 'Morrelganj', nameBn: 'মোড়েলগঞ্জ' },
    ],
  },
  {
    id: 'chuadanga',
    divisionId: 'khulna',
    nameEn: 'Chuadanga',
    nameBn: 'চুয়াডাঙ্গা',
    upazilas: [
      { id: 'chuadanga-sadar', nameEn: 'Chuadanga Sadar', nameBn: 'চুয়াডাঙ্গা সদর' },
      { id: 'alamdanga', nameEn: 'Alamdanga', nameBn: 'আলমডাঙ্গা' },
      { id: 'damurhuda', nameEn: 'Damurhuda', nameBn: 'দামুড়হুদা' },
    ],
  },
  {
    id: 'jhenaidah',
    divisionId: 'khulna',
    nameEn: 'Jhenaidah',
    nameBn: 'ঝিনাইদহ',
    upazilas: [
      { id: 'jhenaidah-sadar', nameEn: 'Jhenaidah Sadar', nameBn: 'ঝিনাইদহ সদর' },
      { id: 'kaliganj-jhen', nameEn: 'Kaliganj', nameBn: 'কালীগঞ্জ' },
      { id: 'shailkupa', nameEn: 'Shailkupa', nameBn: 'শৈলকুপা' },
    ],
  },
  {
    id: 'magura',
    divisionId: 'khulna',
    nameEn: 'Magura',
    nameBn: 'মাগুরা',
    upazilas: [
      { id: 'magura-sadar', nameEn: 'Magura Sadar', nameBn: 'মাগুরা সদর' },
      { id: 'sreepur-mag', nameEn: 'Sreepur', nameBn: 'শ্রীপুর' },
      { id: 'shalikha', nameEn: 'Shalikha', nameBn: 'শালিখা' },
    ],
  },
  {
    id: 'meherpur',
    divisionId: 'khulna',
    nameEn: 'Meherpur',
    nameBn: 'মেহেরপুর',
    upazilas: [
      { id: 'meherpur-sadar', nameEn: 'Meherpur Sadar', nameBn: 'মেহেরপুর সদর' },
      { id: 'gangni', nameEn: 'Gangni', nameBn: 'গাংনী' },
    ],
  },
  {
    id: 'narail',
    divisionId: 'khulna',
    nameEn: 'Narail',
    nameBn: 'নড়াইল',
    upazilas: [
      { id: 'narail-sadar', nameEn: 'Narail Sadar', nameBn: 'নড়াইল সদর' },
      { id: 'lohagari', nameEn: 'Lohagara', nameBn: 'লোহাগড়া' },
      { id: 'kalia', nameEn: 'Kalia', nameBn: 'কালিয়া' },
    ],
  },

  // --- BARISAL DIVISION (6 Districts) ---
  {
    id: 'barisal',
    divisionId: 'barisal',
    nameEn: 'Barishal',
    nameBn: 'বরিশাল',
    upazilas: [
      { id: 'barishal-sadar', nameEn: 'Barishal Sadar', nameBn: 'বরিশাল সদর' },
      { id: 'bakerganj', nameEn: 'Bakerganj', nameBn: 'বাকেরগঞ্জ' },
      { id: 'babuganj', nameEn: 'Babuganj', nameBn: 'বাবুগঞ্জ' },
      { id: 'banaripara', nameEn: 'Banaripara', nameBn: 'বানারীপাড়া' },
      { id: 'gournadi', nameEn: 'Gournadi', nameBn: 'গৌরনদী' },
    ],
  },
  {
    id: 'bhola',
    divisionId: 'barisal',
    nameEn: 'Bhola',
    nameBn: 'ভোলা',
    upazilas: [
      { id: 'bhola-sadar', nameEn: 'Bhola Sadar', nameBn: 'ভোলা সদর' },
      { id: 'borhanuddin', nameEn: 'Borhanuddin', nameBn: 'বোরহানউদ্দিন' },
      { id: 'charfasson', nameEn: 'Char Fasson', nameBn: 'চরফ্যাশন' },
      { id: 'lalmohan', nameEn: 'Lalmohan', nameBn: 'লালমোহন' },
    ],
  },
  {
    id: 'patuakhali',
    divisionId: 'barisal',
    nameEn: 'Patuakhali',
    nameBn: 'পটুয়াখালী',
    upazilas: [
      { id: 'patuakhali-sadar', nameEn: 'Patuakhali Sadar', nameBn: 'পটুয়াখালী সদর' },
      { id: 'kalapara', nameEn: 'Kalapara / Kuakata', nameBn: 'কলাপাড়া / কুয়াকাটা' },
      { id: 'galachipa', nameEn: 'Galachipa', nameBn: 'গলাচিপা' },
      { id: 'dumki', nameEn: 'Dumki', nameBn: 'দুমকি' },
    ],
  },
  {
    id: 'pirojpur',
    divisionId: 'barisal',
    nameEn: 'Pirojpur',
    nameBn: 'পিরোজপুর',
    upazilas: [
      { id: 'pirojpur-sadar', nameEn: 'Pirojpur Sadar', nameBn: 'পিরোজপুর সদর' },
      { id: 'mathbaria', nameEn: 'Mathbaria', nameBn: 'মঠবাড়িয়া' },
      { id: 'nesarabad', nameEn: 'Nesarabad (Swarupkati)', nameBn: 'স্বরূপকাঠি' },
    ],
  },
  {
    id: 'barguna',
    divisionId: 'barisal',
    nameEn: 'Barguna',
    nameBn: 'বরগুনা',
    upazilas: [
      { id: 'barguna-sadar', nameEn: 'Barguna Sadar', nameBn: 'বরগুনা সদর' },
      { id: 'amtali', nameEn: 'Amtali', nameBn: 'আমতলী' },
      { id: 'patharghata', nameEn: 'Patharghata', nameBn: 'পাথরঘাটা' },
    ],
  },
  {
    id: 'jhalokathi',
    divisionId: 'barisal',
    nameEn: 'Jhalokathi',
    nameBn: 'ঝালকাঠি',
    upazilas: [
      { id: 'jhalokathi-sadar', nameEn: 'Jhalokathi Sadar', nameBn: 'ঝালকাঠি সদর' },
      { id: 'nalchity', nameEn: 'Nalchity', nameBn: 'নলছিটি' },
      { id: 'rajapur', nameEn: 'Rajapur', nameBn: 'রাজাপুর' },
    ],
  },

  // --- SYLHET DIVISION (4 Districts) ---
  {
    id: 'sylhet',
    divisionId: 'sylhet',
    nameEn: 'Sylhet',
    nameBn: 'সিলেট',
    upazilas: [
      { id: 'sylhet-sadar', nameEn: 'Sylhet Sadar', nameBn: 'সিলেট সদর' },
      { id: 'beanibazar', nameEn: 'Beanibazar', nameBn: 'বিয়ানীবাজার' },
      { id: 'golapganj', nameEn: 'Golapganj', nameBn: 'গোলাপগঞ্জ' },
      { id: 'fenchuganj', nameEn: 'Fenchuganj', nameBn: 'ফেঞ্চুগঞ্জ' },
      { id: 'biswanath', nameEn: 'Biswanath', nameBn: 'বিশ্বনাথ' },
      { id: 'zakiganj', nameEn: 'Zakiganj', nameBn: 'জকিগঞ্জ' },
    ],
  },
  {
    id: 'moulvibazar',
    divisionId: 'sylhet',
    nameEn: 'Moulvibazar',
    nameBn: 'মৌলভীবাজার',
    upazilas: [
      { id: 'moulvibazar-sadar', nameEn: 'Moulvibazar Sadar', nameBn: 'মৌলভীবাজার সদর' },
      { id: 'sreemangal', nameEn: 'Sreemangal', nameBn: 'শ্রীমঙ্গল' },
      { id: 'kulaura', nameEn: 'Kulaura', nameBn: 'কুলাউড়া' },
      { id: 'kamalganj', nameEn: 'Kamalganj', nameBn: 'কমলগঞ্জ' },
    ],
  },
  {
    id: 'habiganj',
    divisionId: 'sylhet',
    nameEn: 'Habiganj',
    nameBn: 'হবিগঞ্জ',
    upazilas: [
      { id: 'habiganj-sadar', nameEn: 'Habiganj Sadar', nameBn: 'হবিগঞ্জ সদর' },
      { id: 'madhabpur', nameEn: 'Madhabpur', nameBn: 'মাধবপুর' },
      { id: 'nabiganj', nameEn: 'Nabiganj', nameBn: 'নবীগঞ্জ' },
      { id: 'chunarughat', nameEn: 'Chunarughat', nameBn: 'চুনারুঘাট' },
    ],
  },
  {
    id: 'sunamganj',
    divisionId: 'sylhet',
    nameEn: 'Sunamganj',
    nameBn: 'সুনামগঞ্জ',
    upazilas: [
      { id: 'sunamganj-sadar', nameEn: 'Sunamganj Sadar', nameBn: 'সুনামগঞ্জ সদর' },
      { id: 'chhatak', nameEn: 'Chhatak', nameBn: 'ছাতক' },
      { id: 'tahirpur', nameEn: 'Tahirpur', nameBn: 'তাহিরপুর' },
      { id: 'derai', nameEn: 'Derai', nameBn: 'দেরাই' },
    ],
  },

  // --- RANGPUR DIVISION (8 Districts) ---
  {
    id: 'rangpur',
    divisionId: 'rangpur',
    nameEn: 'Rangpur',
    nameBn: 'রংপুর',
    upazilas: [
      { id: 'rangpur-sadar', nameEn: 'Rangpur Sadar', nameBn: 'রংপুর সদর' },
      { id: 'badarganj', nameEn: 'Badarganj', nameBn: 'বদরগঞ্জ' },
      { id: 'mithapukur', nameEn: 'Mithapukur', nameBn: 'মিঠাপুকুর' },
      { id: 'pirganj-rang', nameEn: 'Pirganj', nameBn: 'পীরগঞ্জ' },
      { id: 'kaunia', nameEn: 'Kaunia', nameBn: 'কাউনিয়া' },
    ],
  },
  {
    id: 'dinajpur',
    divisionId: 'rangpur',
    nameEn: 'Dinajpur',
    nameBn: 'দিনাজপুর',
    upazilas: [
      { id: 'dinajpur-sadar', nameEn: 'Dinajpur Sadar', nameBn: 'দিনাজপুর সদর' },
      { id: 'birganj', nameEn: 'Birganj', nameBn: 'বীরগঞ্জ' },
      { id: 'fulbari', nameEn: 'Fulbari', nameBn: 'ফুলবাড়ী' },
      { id: 'parbatipur', nameEn: 'Parbatipur', nameBn: 'পার্বতীপুর' },
    ],
  },
  {
    id: 'gaibandha',
    divisionId: 'rangpur',
    nameEn: 'Gaibandha',
    nameBn: 'গাইবান্ধা',
    upazilas: [
      { id: 'gaibandha-sadar', nameEn: 'Gaibandha Sadar', nameBn: 'গাইবান্ধা সদর' },
      { id: 'gobindaganj', nameEn: 'Gobindaganj', nameBn: 'গোবিন্দগঞ্জ' },
      { id: 'palashbari', nameEn: 'Palashbari', nameBn: 'পলাশবাড়ী' },
    ],
  },
  {
    id: 'kurigram',
    divisionId: 'rangpur',
    nameEn: 'Kurigram',
    nameBn: 'কুড়িগ্রাম',
    upazilas: [
      { id: 'kurigram-sadar', nameEn: 'Kurigram Sadar', nameBn: 'কুড়িগ্রাম সদর' },
      { id: 'nageshwari', nameEn: 'Nageshwari', nameBn: 'নাগেশ্বরী' },
      { id: 'ulipur', nameEn: 'Ulipur', nameBn: 'উলিপুর' },
      { id: 'chilmari', nameEn: 'Chilmari', nameBn: 'চিলমারী' },
    ],
  },
  {
    id: 'nilphamari',
    divisionId: 'rangpur',
    nameEn: 'Nilphamari',
    nameBn: 'নীলফামারী',
    upazilas: [
      { id: 'nilphamari-sadar', nameEn: 'Nilphamari Sadar', nameBn: 'নীলফামারী সদর' },
      { id: 'saidpur', nameEn: 'Saidpur', nameBn: 'সৈয়দপুর' },
      { id: 'domar', nameEn: 'Domar', nameBn: 'ডোমার' },
    ],
  },
  {
    id: 'lalmonirhat',
    divisionId: 'rangpur',
    nameEn: 'Lalmonirhat',
    nameBn: 'লালমনিরহাট',
    upazilas: [
      { id: 'lalmonirhat-sadar', nameEn: 'Lalmonirhat Sadar', nameBn: 'লালমনিরহাট সদর' },
      { id: 'patgram', nameEn: 'Patgram', nameBn: 'পাটগ্রাম' },
      { id: 'aditmari', nameEn: 'Aditmari', nameBn: 'আদিতমারী' },
    ],
  },
  {
    id: 'panchagarh',
    divisionId: 'rangpur',
    nameEn: 'Panchagarh',
    nameBn: 'পঞ্চগড়',
    upazilas: [
      { id: 'panchagarh-sadar', nameEn: 'Panchagarh Sadar', nameBn: 'পঞ্চগড় সদর' },
      { id: 'tetulia', nameEn: 'Tetulia', nameBn: 'তেঁতুলিয়া' },
      { id: 'boda', nameEn: 'Boda', nameBn: 'বোদা' },
    ],
  },
  {
    id: 'thakurgaon',
    divisionId: 'rangpur',
    nameEn: 'Thakurgaon',
    nameBn: 'ঠাকুরগাঁও',
    upazilas: [
      { id: 'thakurgaon-sadar', nameEn: 'Thakurgaon Sadar', nameBn: 'ঠাকুরগাঁও সদর' },
      { id: 'pirganj-thak', nameEn: 'Pirganj', nameBn: 'পীরগঞ্জ' },
      { id: 'ranisankail', nameEn: 'Ranisankail', nameBn: 'রাণীশংকৈল' },
    ],
  },

  // --- MYMENSINGH DIVISION (4 Districts) ---
  {
    id: 'mymensingh',
    divisionId: 'mymensingh',
    nameEn: 'Mymensingh',
    nameBn: 'ময়মনসিংহ',
    upazilas: [
      { id: 'mymensingh-sadar', nameEn: 'Mymensingh Sadar', nameBn: 'ময়মনসিংহ সদর' },
      { id: 'muktagachha', nameEn: 'Muktagachha', nameBn: 'মুক্তাগাছা' },
      { id: 'trishal', nameEn: 'Trishal', nameBn: 'ত্রিশাল' },
      { id: 'fulbaria', nameEn: 'Fulbaria', nameBn: 'ফুলবাড়িয়া' },
      { id: 'gafargaon', nameEn: 'Gafargaon', nameBn: 'গফরগাঁও' },
      { id: 'ishwarganj', nameEn: 'Ishwarganj', nameBn: 'ঈশ্বরগঞ্জ' },
    ],
  },
  {
    id: 'jamalpur',
    divisionId: 'mymensingh',
    nameEn: 'Jamalpur',
    nameBn: 'জামালপুর',
    upazilas: [
      { id: 'jamalpur-sadar', nameEn: 'Jamalpur Sadar', nameBn: 'জামালপুর সদর' },
      { id: 'dewanganj', nameEn: 'Dewanganj', nameBn: 'দেওয়ানগঞ্জ' },
      { id: 'islampur', nameEn: 'Islampur', nameBn: 'ইসলামপুর' },
      { id: 'sarishabari', nameEn: 'Sarishabari', nameBn: 'সরিষাবাড়ী' },
    ],
  },
  {
    id: 'netrokona',
    divisionId: 'mymensingh',
    nameEn: 'Netrokona',
    nameBn: 'নেত্রকোণা',
    upazilas: [
      { id: 'netrokona-sadar', nameEn: 'Netrokona Sadar', nameBn: 'নেত্রকোণা সদর' },
      { id: 'kendua', nameEn: 'Kendua', nameBn: 'কেন্দুয়া' },
      { id: 'durgapur', nameEn: 'Durgapur', nameBn: 'দুর্গাপুর' },
      { id: 'mohanaganj', nameEn: 'Mohanganj', nameBn: 'মোহনগঞ্জ' },
    ],
  },
  {
    id: 'sherpur',
    divisionId: 'mymensingh',
    nameEn: 'Sherpur',
    nameBn: 'শেরপুর',
    upazilas: [
      { id: 'sherpur-sadar', nameEn: 'Sherpur Sadar', nameBn: 'শেরপুর সদর' },
      { id: 'nakla', nameEn: 'Nakla', nameBn: 'নকলা' },
      { id: 'nalitabari', nameEn: 'Nalitabari', nameBn: 'নালিতাবাড়ী' },
      { id: 'jhenaigati', nameEn: 'Jhenaigati', nameBn: 'ঝিনাইগাতী' },
    ],
  },
];

// Helper lookup functions
export function getDivisionById(divisionId: string): Division | undefined {
  return BANGLADESH_DIVISIONS.find((d) => d.id === divisionId);
}

export function getDistrictsByDivision(divisionId: string): District[] {
  return BANGLADESH_DISTRICTS.filter((d) => d.divisionId === divisionId);
}

export function getDistrictById(districtId: string): District | undefined {
  return BANGLADESH_DISTRICTS.find((d) => d.id === districtId);
}

export function getUpazilaById(districtId: string, upazilaId: string) {
  const district = getDistrictById(districtId);
  return district?.upazilas.find((u) => u.id === upazilaId);
}
