import { Complaint, Member, Poll, NotificationItem } from './types';

export const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'comp-1',
    trackingNumber: '#NGR-2024-089',
    titleMr: 'रस्त्यावरील दिवे बंद आहेत',
    titleEn: 'Street lights are off',
    category: 'electricity',
    categoryMr: 'वीज',
    status: 'ongoing',
    statusMr: 'सुरू',
    dateMr: '१२ ऑक्टोबर २०२४',
    dateISO: '2024-10-12',
    wardNo: 4,
    locationNameMr: 'प्रभाग क्रमांक ४, शास्त्री नगर, कोथरूड',
    descriptionMr: 'शास्त्री नगर गल्ली क्र. ३ मध्ये गेल्या ३ दिवसांपासून पथदिवे बंद आहेत. रात्रीच्या वेळी अंधारामुळे नागरिकांना ये-जा करताना त्रास होतोय.',
    assignedOfficerMr: 'राहुल गायकवाड',
    expectedDays: 1,
    priority: 'high',
    priorityMr: 'उच्च',
    imageUrl: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=600&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=600&auto=format&fit=crop&q=80'
    ],
    timeline: [
      { id: 't1', titleMr: 'तक्रार प्राप्त (Received)', titleEn: 'Received', timestamp: '१२ ऑक्टो | १०:३० AM', isCompleted: true },
      { id: 't2', titleMr: 'पडताळणी (Verification)', titleEn: 'Verification', timestamp: '१२ ऑक्टो | ०२:१५ PM', isCompleted: true },
      { id: 't3', titleMr: 'सदस्याला दिली (Assigned)', titleEn: 'Assigned', timestamp: '१३ ऑक्टो | ०९:०० AM', isCompleted: true },
      { id: 't4', titleMr: 'काम सुरू (Work Started)', titleEn: 'Work Started', timestamp: '१३ ऑक्टो | ११:४५ AM', isCompleted: true, isCurrent: true },
      { id: 't5', titleMr: 'काम पूर्ण (Work Completed)', titleEn: 'Work Completed', isCompleted: false },
      { id: 't6', titleMr: 'बंद (Closed)', titleEn: 'Closed', isCompleted: false }
    ]
  },
  {
    id: 'comp-2',
    trackingNumber: '#NGR-2024-072',
    titleMr: 'कचरा कुंडी सफाईबाबत',
    titleEn: 'Garbage bin cleaning issue',
    category: 'waste',
    categoryMr: 'कचरा',
    status: 'completed',
    statusMr: 'पूर्ण',
    dateMr: '१० ऑक्टोबर २०२४',
    dateISO: '2024-10-10',
    wardNo: 12,
    locationNameMr: 'वार्ड क्र. १२, गणेश नगर बाजार',
    descriptionMr: 'मुख्य चौकातील कचरा कुंडी पूर्ण भरली असून दुर्गंधी पसरली आहे. नियमित उचलण्याची आवश्यकता आहे.',
    assignedOfficerMr: 'स्नेहल पाटील',
    expectedDays: 0,
    priority: 'medium',
    priorityMr: 'मध्यम',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80',
    timeline: [
      { id: 't1', titleMr: 'तक्रार प्राप्त (Received)', titleEn: 'Received', timestamp: '१० ऑक्टो | ०८:०० AM', isCompleted: true },
      { id: 't2', titleMr: 'पडताळणी (Verification)', titleEn: 'Verification', timestamp: '१० ऑक्टो | ०९:३० AM', isCompleted: true },
      { id: 't3', titleMr: 'सदस्याला दिली (Assigned)', titleEn: 'Assigned', timestamp: '१० ऑक्टो | ११:०० AM', isCompleted: true },
      { id: 't4', titleMr: 'काम सुरू (Work Started)', titleEn: 'Work Started', timestamp: '१० ऑक्टो | ०१:०० PM', isCompleted: true },
      { id: 't5', titleMr: 'काम पूर्ण (Work Completed)', titleEn: 'Work Completed', timestamp: '१० ऑक्टो | ०५:०० PM', isCompleted: true, isCurrent: true },
      { id: 't6', titleMr: 'बंद (Closed)', titleEn: 'Closed', timestamp: '११ ऑक्टो | ०९:०० AM', isCompleted: true }
    ]
  },
  {
    id: 'comp-3',
    trackingNumber: '#NGR-2024-095',
    titleMr: 'पाण्याची पाईप लाईन गळती',
    titleEn: 'Water pipe leakage',
    category: 'water',
    categoryMr: 'पाणी',
    status: 'pending',
    statusMr: 'प्रलंबित',
    dateMr: '१४ ऑक्टोबर २०२४',
    dateISO: '2024-10-14',
    wardNo: 7,
    locationNameMr: 'वार्ड क्र. ७, टिळक रोड',
    descriptionMr: 'पिण्याच्या पाण्याची मुख्य लाईन फुटल्यामुळे मोठ्या प्रमाणात पाणी रस्त्यावर वाया जात आहे.',
    assignedOfficerMr: 'श्री. देसाई',
    expectedDays: 2,
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=600&auto=format&fit=crop&q=80',
    timeline: [
      { id: 't1', titleMr: 'तक्रार प्राप्त (Received)', titleEn: 'Received', timestamp: '१४ ऑक्टो | ०७:३० AM', isCompleted: true, isCurrent: true },
      { id: 't2', titleMr: 'पडताळणी (Verification)', titleEn: 'Verification', isCompleted: false },
      { id: 't3', titleMr: 'सदस्याला दिली (Assigned)', titleEn: 'Assigned', isCompleted: false },
      { id: 't4', titleMr: 'काम सुरू (Work Started)', titleEn: 'Work Started', isCompleted: false },
      { id: 't5', titleMr: 'काम पूर्ण (Work Completed)', titleEn: 'Work Completed', isCompleted: false },
      { id: 't6', titleMr: 'बंद (Closed)', titleEn: 'Closed', isCompleted: false }
    ]
  },
  {
    id: 'comp-4',
    trackingNumber: '#NAG-2401',
    titleMr: 'खराब रस्ता आणि खड्डे',
    titleEn: 'Damaged road and potholes',
    category: 'roads',
    categoryMr: 'रस्ते',
    status: 'pending',
    statusMr: 'प्रलंबित',
    dateMr: '१५ ऑक्टोबर २०२४',
    dateISO: '2024-10-15',
    wardNo: 4,
    locationNameMr: 'प्रभाग क्र. ४, शिवाजी चौक',
    descriptionMr: 'पावसामुळे चौकामध्ये मोठे खड्डे पडले असून अपघात होण्याचा धोका आहे.',
    assignedOfficerMr: 'श्री. देसाई',
    expectedDays: 2,
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80',
    timeline: [
      { id: 't1', titleMr: 'तक्रार प्राप्त (Received)', titleEn: 'Received', timestamp: '१५ ऑक्टो | ०९:०० AM', isCompleted: true, isCurrent: true },
      { id: 't2', titleMr: 'पडताळणी (Verification)', titleEn: 'Verification', isCompleted: false },
      { id: 't3', titleMr: 'सदस्याला दिली (Assigned)', titleEn: 'Assigned', isCompleted: false },
      { id: 't4', titleMr: 'काम सुरू (Work Started)', titleEn: 'Work Started', isCompleted: false },
      { id: 't5', titleMr: 'काम पूर्ण (Work Completed)', titleEn: 'Work Completed', isCompleted: false },
      { id: 't6', titleMr: 'बंद (Closed)', titleEn: 'Closed', isCompleted: false }
    ]
  }
];

export const INITIAL_MEMBERS: Member[] = [
  {
    id: 'mem-1',
    nameMr: 'राजेश कुलकर्णी',
    nameEn: 'Rajesh Kulkarni',
    wardNo: 12,
    status: 'active',
    statusMr: 'सक्रिय',
    solvedComplaints: 145,
    performancePercent: 85,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    phone: '9822112233'
  },
  {
    id: 'mem-2',
    nameMr: 'स्नेहल पाटील',
    nameEn: 'Snehal Patil',
    wardNo: 5,
    status: 'active',
    statusMr: 'सक्रिय',
    solvedComplaints: 210,
    performancePercent: 95,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    phone: '9822445566'
  },
  {
    id: 'mem-3',
    nameMr: 'अमित शिंदे',
    nameEn: 'Amit Shinde',
    wardNo: 21,
    status: 'on_leave',
    statusMr: 'सुट्टीवर',
    solvedComplaints: 88,
    performancePercent: 70,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    phone: '9822778899'
  },
  {
    id: 'mem-4',
    nameMr: 'राहुल गायकवाड',
    nameEn: 'Rahul Gaikwad',
    wardNo: 4,
    status: 'active',
    statusMr: 'सक्रिय',
    solvedComplaints: 172,
    performancePercent: 91,
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
    phone: '9822334455'
  }
];

export const INITIAL_POLLS: Poll[] = [
  {
    id: 'poll-1',
    titleMr: 'आनंदनगर उद्यानात मुलांसाठी नवीन खेळणी बसवणे',
    descriptionMr: 'आपल्या प्रभागातील मध्यवर्ती उद्यानाचे सुशोभीकरण आणि नवीन आधुनिक खेळणी बसवण्याबाबत मत नोंदवा.',
    categoryMr: 'सुशोभीकरण',
    totalVotes: 342,
    hasVoted: false,
    options: [
      { id: 'opt-1', textMr: 'होय, त्वरित बसवावीत', votes: 280 },
      { id: 'opt-2', textMr: 'आधी ओपन जिम तयार करावी', votes: 45 },
      { id: 'opt-3', textMr: 'गरज नाही', votes: 17 }
    ]
  },
  {
    id: 'poll-2',
    titleMr: 'स्मार्ट सौर पथदिवे (Solar Street Lights) बसवणे',
    descriptionMr: 'प्रभाग क्र. ४ मध्ये हरित ऊर्जेचा वापर वाढवण्यासाठी सर्व गल्ल्यांमध्ये सौर पथदिवे लावणे.',
    categoryMr: 'ऊर्जा व पर्यावरण',
    totalVotes: 512,
    hasVoted: true,
    selectedOptionId: 'opt-21',
    options: [
      { id: 'opt-21', textMr: 'पूर्णपणे पाठिंबा आहे', votes: 430 },
      { id: 'opt-22', textMr: 'अजून माहिती हवी', votes: 62 },
      { id: 'opt-23', textMr: 'सध्याचेच दिवे योग्य आहेत', votes: 20 }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    titleMr: 'तक्रार अपडेट: #NGR-2024-089',
    messageMr: 'तुमच्या तक्रारीवर राहुल गायकवाड यांनी काम सुरू केले आहे.',
    timeMr: '१० मिनिटांपूर्वी',
    isRead: false,
    type: 'update'
  },
  {
    id: 'notif-2',
    titleMr: 'आरोग्य शिबीर सूचना',
    messageMr: 'उद्या सकाळी ९ वाजता समाज मंदिरात मोफत आरोग्य तपासणी शिबीर आयोजित केले आहे.',
    timeMr: '२ तासांपूर्वी',
    isRead: false,
    type: 'alert'
  },
  {
    id: 'notif-3',
    titleMr: 'नवीन मतदानात सहभागी व्हा',
    messageMr: 'आनंदनगर उद्यानातील सुशोभीकरणाबाबत आपले मत नोंदवा.',
    timeMr: '१ दिवसापूर्वी',
    isRead: true,
    type: 'poll'
  }
];
