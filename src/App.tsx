import React, { useState, useEffect } from 'react';
import {
  Complaint,
  Member,
  NotificationItem,
  Poll,
  ScreenId,
  UserRole
} from './types';
import {
  INITIAL_COMPLAINTS,
  INITIAL_MEMBERS,
  INITIAL_NOTIFICATIONS,
  INITIAL_POLLS
} from './mockData';

import { NavigationHeader } from './components/NavigationHeader';
import { BottomNavBar } from './components/BottomNavBar';
import { LoginScreen } from './components/LoginScreen';
import { VerificationSuccessScreen } from './components/VerificationSuccessScreen';
import { CitizenDashboard } from './components/CitizenDashboard';
import { MyComplaintsScreen } from './components/MyComplaintsScreen';
import { FileComplaintScreen } from './components/FileComplaintScreen';
import { AdminDashboard } from './components/AdminDashboard';
import { MembersManagementScreen } from './components/MembersManagementScreen';
import { VotingPollsScreen } from './components/VotingPollsScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { ProfileScreen } from './components/ProfileScreen';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('citizen_dashboard');
  const [userRole, setUserRole] = useState<UserRole>('citizen');
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(true);

  // User Profile
  const [userName, setUserName] = useState<string>('राकेश पाटील');
  const [userMobile, setUserMobile] = useState<string>('९८७६५४३२१०');

  // Application Dynamic State
  const [complaints, setComplaints] = useState<Complaint[]>(INITIAL_COMPLAINTS);
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [polls, setPolls] = useState<Poll[]>(INITIAL_POLLS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    INITIAL_NOTIFICATIONS
  );

  // Login handler
  const handleLoginSuccess = (
    firstName: string,
    lastName: string,
    mobile: string
  ) => {
    const fullName = `${firstName} ${lastName}`.trim() || 'राकेश पाटील';
    setUserName(fullName);
    setUserMobile(mobile || '९८७६५४३२१०');
    setActiveScreen('verification_success');
  };

  // Add Complaint
  const handleAddComplaint = (newComp: Partial<Complaint>) => {
    const created: Complaint = {
      id: `comp-${Date.now()}`,
      trackingNumber: `#NGR-2024-${Math.floor(100 + Math.random() * 900)}`,
      titleMr: newComp.titleMr || 'नवीन तक्रार',
      titleEn: 'New Complaint',
      category: newComp.category || 'other',
      categoryMr: newComp.categoryMr || 'इतर',
      status: 'pending',
      statusMr: 'प्रलंबित',
      dateMr: 'आज (आत्ताच)',
      dateISO: new Date().toISOString().split('T')[0],
      wardNo: 42,
      locationNameMr: newComp.locationNameMr || 'वार्ड क्र. ४२, शास्त्री नगर',
      descriptionMr: newComp.descriptionMr,
      assignedOfficerMr: 'श्री. देसाई',
      expectedDays: 2,
      imageUrl:
        newComp.imageUrl ||
        'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80',
      additionalImages: newComp.additionalImages || [],
      priority: newComp.priority || 'high',
      priorityMr: newComp.priorityMr || 'उच्च',
      timeline: [
        {
          id: 't1',
          titleMr: 'तक्रार प्राप्त (Received)',
          titleEn: 'Received',
          timestamp: 'आज | आत्ताच',
          isCompleted: true,
          isCurrent: true
        },
        {
          id: 't2',
          titleMr: 'पडताळणी (Verification)',
          titleEn: 'Verification',
          isCompleted: false
        },
        {
          id: 't3',
          titleMr: 'सदस्याला दिली (Assigned)',
          titleEn: 'Assigned',
          isCompleted: false
        },
        {
          id: 't4',
          titleMr: 'काम सुरू (Work Started)',
          titleEn: 'Work Started',
          isCompleted: false
        },
        {
          id: 't5',
          titleMr: 'काम पूर्ण (Work Completed)',
          titleEn: 'Work Completed',
          isCompleted: false
        },
        { id: 't6', titleMr: 'बंद (Closed)', titleEn: 'Closed', isCompleted: false }
      ]
    };

    setComplaints((prev) => [created, ...prev]);

    // Add Notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        titleMr: `नवीन तक्रार नोंदवली: ${created.trackingNumber}`,
        messageMr: `तुमची '${created.titleMr}' ही तक्रार यशस्वीपणे प्राप्त झाली आहे.`,
        timeMr: 'आत्ताच',
        isRead: false,
        type: 'update'
      },
      ...prev
    ]);
  };

  // Follow-up handler
  const handleFollowUp = (complaintId: string, note?: string) => {
    let trackingNum = '';
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id === complaintId) {
          trackingNum = c.trackingNumber;
          const currentIdx = c.timeline.findIndex((t) => t.isCurrent);
          const nextIdx = currentIdx >= 0 ? currentIdx + 1 : 1;

          if (nextIdx < c.timeline.length) {
            const updatedTimeline = c.timeline.map((t, idx) => ({
              ...t,
              isCompleted: idx <= nextIdx,
              isCurrent: idx === nextIdx,
              timestamp: idx === nextIdx ? `आज | पाठपुरावा: ${note || 'तातडीने कारवाई'}` : t.timestamp
            }));

            const newStatus = nextIdx >= 4 ? 'completed' : 'ongoing';
            const newStatusMr = nextIdx >= 4 ? 'पूर्ण' : 'सुरू';

            return {
              ...c,
              status: newStatus as any,
              statusMr: newStatusMr,
              timeline: updatedTimeline
            };
          }
        }
        return c;
      })
    );

    // Add Notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        titleMr: `तक्रारीचा पाठपुरावा नोंदवला (${trackingNum})`,
        messageMr: note || 'तुमच्या तक्रारीबाबत संबंधित अधिकार्‍यांना पुन्हा स्मरणपत्र पाठवले आहे.',
        timeMr: 'आत्ताच',
        isRead: false,
        type: 'update'
      },
      ...prev
    ]);
  };

  // Delete Complaint
  const handleDeleteComplaint = (complaintId: string) => {
    const target = complaints.find((c) => c.id === complaintId);
    setComplaints((prev) => prev.filter((c) => c.id !== complaintId));
    if (target) {
      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          titleMr: `तक्रार हटवली गेली: ${target.trackingNumber}`,
          messageMr: `'${target.titleMr}' ही तक्रार सिस्टीममधून यशस्वीरीत्या काढली आहे.`,
          timeMr: 'आत्ताच',
          isRead: false,
          type: 'alert'
        },
        ...prev
      ]);
    }
  };

  // Mark Complaint Complete
  const handleMarkComplete = (complaintId: string, note?: string) => {
    let trackingNum = '';
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id === complaintId) {
          trackingNum = c.trackingNumber;
          const updatedTimeline = c.timeline.map((t) => ({
            ...t,
            isCompleted: true,
            isCurrent: false,
            timestamp: t.isCompleted ? t.timestamp : 'आज | पूर्ण झाले'
          }));

          return {
            ...c,
            status: 'completed',
            statusMr: 'पूर्ण',
            timeline: updatedTimeline
          };
        }
        return c;
      })
    );

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        titleMr: `काम पूर्ण झाले: ${trackingNum}`,
        messageMr: note || 'तुमची तक्रार यशस्वीरीत्या सोडवण्यात आली आहे. धन्यवाद!',
        timeMr: 'आत्ताच',
        isRead: false,
        type: 'update'
      },
      ...prev
    ]);
  };

  // Assign Member to Complaint
  const handleAssignMember = (complaintId: string, memberNameMr: string) => {
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id === complaintId) {
          return {
            ...c,
            assignedOfficerMr: memberNameMr,
            status: c.status === 'pending' ? 'ongoing' : c.status,
            statusMr: c.status === 'pending' ? 'सुरू' : c.statusMr
          };
        }
        return c;
      })
    );

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        titleMr: `सदस्य सोपवला गेला: ${memberNameMr}`,
        messageMr: `तक्रार क्र. वर सदस्य ${memberNameMr} यांची नियुक्ती केली आहे.`,
        timeMr: 'आत्ताच',
        isRead: false,
        type: 'system'
      },
      ...prev
    ]);
  };

  // Add Member
  const handleAddMember = (newMem: Partial<Member>) => {
    const created: Member = {
      id: `mem-${Date.now()}`,
      nameMr: newMem.nameMr || 'नवीन सदस्य',
      nameEn: newMem.nameEn || 'New Member',
      wardNo: newMem.wardNo || 15,
      status: 'active',
      statusMr: 'सक्रिय',
      solvedComplaints: 0,
      performancePercent: 100,
      avatarUrl:
        newMem.avatarUrl ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      phone: newMem.phone || '9822001122'
    };
    setMembers((prev) => [created, ...prev]);
  };

  // Delete Member
  const handleDeleteMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  // Vote
  const handleVote = (pollId: string, optionId: string) => {
    setPolls((prev) =>
      prev.map((p) => {
        if (p.id === pollId) {
          return {
            ...p,
            hasVoted: true,
            selectedOptionId: optionId,
            totalVotes: p.totalVotes + 1
          };
        }
        return p;
      })
    );
  };

  // Notifications
  const handleMarkNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Render Screen Content
  const renderScreen = () => {
    switch (activeScreen) {
      case 'login':
        return (
          <LoginScreen
            userRole={userRole}
            setUserRole={setUserRole}
            onLoginSuccess={handleLoginSuccess}
          />
        );

      case 'verification_success':
        return (
          <VerificationSuccessScreen
            onProceed={() =>
              setActiveScreen(
                userRole === 'admin' ? 'admin_dashboard' : 'citizen_dashboard'
              )
            }
          />
        );

      case 'citizen_dashboard':
        return (
          <CitizenDashboard
            userName={userName}
            complaints={complaints}
            setActiveScreen={setActiveScreen}
            onFollowUp={handleFollowUp}
          />
        );

      case 'my_complaints':
        return (
          <MyComplaintsScreen
            complaints={complaints}
            setActiveScreen={setActiveScreen}
            onFollowUp={handleFollowUp}
            onDeleteComplaint={handleDeleteComplaint}
            onMarkComplete={handleMarkComplete}
          />
        );

      case 'file_complaint':
        return (
          <FileComplaintScreen
            onAddComplaint={handleAddComplaint}
            setActiveScreen={setActiveScreen}
          />
        );

      case 'admin_dashboard':
        return (
          <AdminDashboard
            complaints={complaints}
            members={members}
            setActiveScreen={setActiveScreen}
            onAssignMember={handleAssignMember}
          />
        );

      case 'members_management':
        return (
          <MembersManagementScreen
            members={members}
            onAddMember={handleAddMember}
            onDeleteMember={handleDeleteMember}
            setActiveScreen={setActiveScreen}
          />
        );

      case 'voting_polls':
        return <VotingPollsScreen polls={polls} onVote={handleVote} />;

      case 'notifications':
        return (
          <NotificationsScreen
            notifications={notifications}
            onMarkAllRead={handleMarkNotificationsRead}
          />
        );

      case 'profile':
        return (
          <ProfileScreen
            userName={userName}
            mobile={userMobile}
            userRole={userRole}
            setUserRole={setUserRole}
            setActiveScreen={setActiveScreen}
          />
        );

      default:
        return (
          <CitizenDashboard
            userName={userName}
            complaints={complaints}
            setActiveScreen={setActiveScreen}
            onFollowUp={handleFollowUp}
          />
        );
    }
  };

  const hideBottomNav =
    activeScreen === 'login' || activeScreen === 'verification_success';

  // Safely detect native Capacitor app environment
  const [isNativeApp, setIsNativeApp] = useState<boolean>(false);
  useEffect(() => {
    try {
      const cap = (window as any).Capacitor;
      const isNative = Boolean(cap && cap.isNativePlatform && cap.isNativePlatform());
      setIsNativeApp(isNative);
    } catch {
      setIsNativeApp(false);
    }
  }, []);

  // On native app: show clean full-screen layout without dev header
  if (isNativeApp) {
    return (
      <div
        className="flex flex-col w-full bg-[#F3F4F9]"
        style={{ height: '100dvh', overflow: 'hidden' }}
      >
        {/* Status bar safe area spacer - pushes content below notch */}
        <div style={{ height: 'env(safe-area-inset-top, 24px)', background: '#F7F2FA', flexShrink: 0 }} />
        <main className="screen-scroll no-scrollbar" style={{ flex: 1 }}>
          {renderScreen()}
        </main>
        {!hideBottomNav && (
          <BottomNavBar
            activeScreen={activeScreen}
            setActiveScreen={setActiveScreen}
            userRole={userRole}
            unreadNotificationsCount={unreadCount}
          />
        )}
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col relative overflow-x-hidden w-full">
      {/* Dev Bar & Screen Switcher */}
      <NavigationHeader
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
        userRole={userRole}
        setUserRole={setUserRole}
        isMobileFrame={isMobileFrame}
        setIsMobileFrame={setIsMobileFrame}
        userName={userName}
      />

      {/* Main Stage View */}
      <main className="flex-1 flex flex-col w-full overflow-x-hidden">
        {isMobileFrame ? (
          /* Mobile Simulator Frame */
          <div className="w-full max-w-md bg-slate-50 min-h-[840px] md:rounded-[36px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border-0 md:border-[8px] border-slate-800 relative flex flex-col overflow-hidden my-2 mx-auto">
            <div className="flex-1 overflow-y-auto relative">{renderScreen()}</div>
            {!hideBottomNav && (
              <BottomNavBar
                activeScreen={activeScreen}
                setActiveScreen={setActiveScreen}
                userRole={userRole}
                unreadNotificationsCount={unreadCount}
              />
            )}
          </div>
        ) : (
          /* Full Width Desktop View */
          <div className="w-full max-w-5xl mx-auto bg-slate-50 min-h-screen shadow-xl rounded-2xl overflow-hidden relative border border-slate-200 my-4">
            <div className="p-4">{renderScreen()}</div>
            {!hideBottomNav && (
              <BottomNavBar
                activeScreen={activeScreen}
                setActiveScreen={setActiveScreen}
                userRole={userRole}
                unreadNotificationsCount={unreadCount}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
