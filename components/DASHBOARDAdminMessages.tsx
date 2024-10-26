import { useEffect, useRef, useState } from 'react';
import { getAuth } from 'firebase/auth';
import {
    addDoc,
    collection,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    Timestamp,
    doc
} from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import Image from 'next/image';
import Link from 'next/link';
import DashboardAdminSideNav from './DashboardAdminSideNav';

const DASHBOARDAdminMessages = () => {
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const fetchConversations = async () => {
            const usersSnapshot = await getDocs(collection(db, 'users'));
            const allConversations = [];

            // Iterate over each user to find their conversations with 'Lucidify'
            for (const userDoc of usersSnapshot.docs) {
                const userId = userDoc.id;
                const userDisplayName = userDoc.data().displayName; // Get the user's displayName
                const userPhotoURL = userDoc.data().photoURL; // Get the user's photoURL
                const conversationsRef = collection(db, 'users', userId, 'conversations');
                const conversationsSnapshot = await getDocs(conversationsRef);

                conversationsSnapshot.forEach(doc => {
                    const conversationData = doc.data();
                    if (conversationData.title === 'Lucidify') {
                        allConversations.push({
                            userId,
                            id: doc.id,
                            displayName: userDisplayName, // Store displayName for easy access
                            photoURL: userPhotoURL, // Store photoURL for easy access
                            ...conversationData,
                        });
                    }
                });
            }
            setConversations(allConversations);

            // Set the first conversation as selected if exists
            if (allConversations.length > 0) {
                setSelectedChat(allConversations[0]);
                fetchMessages(allConversations[0].userId, allConversations[0].id);
            }
        };

        fetchConversations();
    }, []);

    const fetchMessages = async (userId, conversationId) => {
        const messagesRef = collection(db, 'users', userId, 'conversations', conversationId, 'messages');
        const q = query(messagesRef, orderBy("timestamp", "asc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedMessages = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMessages(fetchedMessages);
        });

        return () => unsubscribe();
    };

    const handleChatSelect = (conversation) => {
        setSelectedChat(conversation);
        fetchMessages(conversation.userId, conversation.id);
    };

    const sendMessage = async () => {
        if (newMessage.trim() === '' || !selectedChat) return;

        const messageData = {
            text: newMessage,
            sender: 'Lucidify',
            timestamp: new Date(),
        };

        await addDoc(
            collection(db, 'users', selectedChat.userId, 'conversations', selectedChat.id, 'messages'),
            messageData
        );
        setNewMessage('');
    };

    const formatTimestamp = (timestamp) => {
        if (timestamp instanceof Timestamp) {
            const date = timestamp.toDate();
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        return '1:08';
    };

    const chunkMessagesBySender = (messages) => {
        const groupedMessages = [];
        let currentGroup = [];

        messages.forEach((message, index) => {
            if (index === 0 || message.sender !== messages[index - 1].sender) {
                if (currentGroup.length > 0) {
                    groupedMessages.push(currentGroup);
                }
                currentGroup = [message];
            } else {
                currentGroup.push(message);
            }
        });

        if (currentGroup.length > 0) {
            groupedMessages.push(currentGroup);
        }

        return groupedMessages;
    };

    const groupedMessages = chunkMessagesBySender(messages);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom whenever groupedMessages change
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [groupedMessages]);

    return (
        <div className="flex h-screen DashboardBackgroundGradient">
            {/* Left Sidebar */}
            <DashboardAdminSideNav highlight="messages" />

            {/* Right Side (Main Content) */}
            <div className="flex-1 flex flex-col"> {/* Takes up remaining space */}
                <div className="absolute BottomGradientBorder left-0 top-[103px] w-full" />
                <div className="flex min-w-min items-center justify-between px-[50px] py-6">
                    <div className="inline-flex items-center gap-[5px]">
                        <div className="inline-flex items-center gap-[5px] opacity-40">
                            <div className="w-[15px]">
                                <Image
                                    src="/Home Icon.png"
                                    alt="Home Icon"
                                    layout="responsive"
                                    width={0}
                                    height={0}
                                />
                            </div>
                            <div className="font-light text-sm">
                                Home
                            </div>
                        </div>
                        <div className="inline-flex items-center gap-[5px]">
                            <div className=" font-light text-sm">
                                / Messages
                            </div>
                        </div>
                    </div>
                    <div className="inline-flex items-center gap-5">
                        <div className="flex w-[55px] h-[55px] items-center justify-center gap-2.5 relative rounded-[100px] BlackGradient ContentCardShadow hover:cursor-pointer">
                            <div className="flex flex-col w-5 h-5 items-center justify-center gap-2.5 px-[3px] py-0 absolute -top-[5px] -left-[4px] bg-[#6265f0] rounded-md">
                                <div className=" font-normal text-xs">
                                    2
                                </div>
                            </div>
                            <div className=" w-[25px]">
                                <Image
                                    src="/Notification Bell Icon.png"
                                    alt="Bell Icon"
                                    layout="responsive"
                                    width={0}
                                    height={0}
                                />
                            </div>
                        </div>
                        <Link
                            href="/settings"
                            className="flex w-[129px] h-[55px] items-center justify-center gap-2.5 px-0 py-[15px]  rounded-[15px] BlackGradient ContentCardShadow">
                            <div className=" font-light text-sm">
                                Settings
                            </div>
                            <div className=" w-[30px]">
                                <Image
                                    src="/Settings Icon.png"
                                    alt="Settings Icon"
                                    layout="responsive"
                                    width={0}
                                    height={0}
                                />
                            </div>
                        </Link>
                    </div>
                </div>

                {/* START OF MESSAGES */}
                <div className="flex h-screen DashboardBackgroundGradient">
                    <div className="flex w-full justify-center h-full">
                        <div className="flex w-full mx-[50px] my-[30px] p-[1px] ContentCardShadow rounded-[35px]">
                            <div className="flex flex-col w-[467px] bg-gradient-to-br from-[#1A1A1A] to-[#101010] rounded-l-[35px]">
                                <div className="flex justify-between mx-[50px] mt-[25px] items-center">
                                    <h1 className="text-[30px] font-semibold mb-[2px]">Messages</h1>
                                    <div className="hover:cursor-pointer flex items-center gap-[6px] px-[16px] py-[8px] rounded-[10px] PopupAttentionGradient PopupAttentionShadow">
                                        <div className="w-[15px]">
                                            <Image
                                                src="/Plus Icon.png"
                                                alt="Plus Icon"
                                                layout="responsive"
                                                width={0}
                                                height={0}
                                            />
                                        </div>
                                        <h3 className="text-[14px] font-light">New</h3>
                                    </div>
                                </div>
                                <div className="relative my-[50px] mx-[50px]">
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="w-full px-[15px] py-[15px] rounded-lg BlackWithLightGradient ContentCardShadow text-[14px] focus:outline-none"
                                    />
                                </div>
                                <div className="flex flex-col gap-[30px]">
                                    <div className="flex flex-col gap-[10px]">
                                        <h3 className="px-[50px] opacity-70 font-light text-[14px]">All Messages</h3>
                                        <div className="flex flex-col">
                                            {conversations.length > 0 ? (
                                                conversations.map(conversation => (
                                                    <div
                                                        key={conversation.id}
                                                        className={`px-[50px] py-[22px] border-t-[0.5px] border-solid border-white ${selectedChat && selectedChat.id === conversation.id ? 'MessagesHighlightGradient border-opacity-50' : 'border-opacity-25'} text-white cursor-pointer flex gap-[15px]`}
                                                        onClick={() => handleChatSelect(conversation)}
                                                    >
                                                        <div className="rounded-[5px] BlackGradient ContentCardShadow flex justify-center items-center">
                                                            <div className="w-[30px] mx-[8px] my-[8px] rounded-full overflow-clip">
                                                                <Image
                                                                    src={conversation.photoURL || '/Lucidify Umbrella.png'} // Use the user's photoURL or a default image
                                                                    alt="Lucidify Logo"
                                                                    layout="responsive"
                                                                    width={0}
                                                                    height={0}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col h-full flex-grow">
                                                            <div className="flex justify-between w-full">
                                                                {/* Display user's displayName instead of the title */}
                                                                <h4 className="text-[16px] flex-grow">{conversation.displayName}</h4>
                                                                <h4 className="text-[12px] opacity-60">{formatTimestamp(conversation.timestamp)}</h4>
                                                            </div>
                                                            <div className="flex justify-between w-full">
                                                                <p className="text-[14px] opacity-40 whitespace-nowrap overflow-hidden text-ellipsis" style={{ maxWidth: '250px' }}>
                                                                    {conversation.lastMessage}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="w-full flex justify-center items-center">
                                                    <p className="text-sm opacity-60 text-white pt-[30px] pb-[40px]">No messages</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 bg-gradient-to-br from-[#101010] to-[#1A1A1A] rounded-r-[35px] flex flex-col LeftGradientBorder">
                                {/* Top part - fixed at the top */}
                                <div className="BlackWithLightGradient rounded-tr-[35px] px-[60px] py-[20px] flex justify-between border-b-[0.5px] border-solid border-white border-opacity-20 flex-shrink-0">
                                    <div className="flex gap-[10px]">
                                        <div className="rounded-[5px] BlackGradient ContentCardShadow flex justify-center items-center">
                                            <div className="w-[30px] h-[30px] flex items-center mx-[8px] my-[8px] rounded-full overflow-clip">
                                                {selectedChat ? (
                                                    <Image
                                                        src={selectedChat.photoURL || '/Lucidify Umbrella.png'}
                                                        alt="Lucidify Logo"
                                                        layout="responsive"
                                                        width={0}
                                                        height={0}
                                                    />
                                                ) : (
                                                    <Image
                                                        src="/Lucidify Umbrella.png" // Fallback image when no chat is selected
                                                        alt="Lucidify Logo"
                                                        layout="responsive"
                                                        width={0}
                                                        height={0}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="h-full flex flex-col justify-between font-semibold text-[16px]">
                                            <h3>{selectedChat ? selectedChat.displayName || 'Untitled Chat' : 'Loading...'}</h3>
                                            <h3 className="opacity-60 text-[14px] font-light">
                                                {selectedChat ? selectedChat.lastSeen || 'Last seen...' : 'Last seen...'}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="flex gap-[30px] items-center">
                                        <div className="flex gap-[15px]">
                                            <div className="rounded-[5px] BlackGradient ContentCardShadow flex justify-center items-center hover:cursor-pointer hover:scale-95">
                                                <div className="w-[20px] h-[20px] flex items-center mx-[8px] my-[8px]">
                                                    <Image
                                                        src="/Phone Call Icon.png"
                                                        alt="Phone Call Icon"
                                                        layout="responsive"
                                                        width={0}
                                                        height={0}
                                                    />
                                                </div>
                                            </div>
                                            <div className="rounded-[5px] BlackGradient ContentCardShadow flex justify-center items-center hover:cursor-pointer hover:scale-95">
                                                <div className="w-[20px] h-[20px] flex items-center mx-[8px] my-[8px]">
                                                    <Image
                                                        src="/Video Call Icon.png"
                                                        alt="Video Call Icon"
                                                        layout="responsive"
                                                        width={0}
                                                        height={0}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-[4px] hover:cursor-pointer hover:opacity-50">
                                            <div className="bg-white rounded-full w-[4px] h-[4px]" />
                                            <div className="bg-white rounded-full w-[4px] h-[4px]" />
                                            <div className="bg-white rounded-full w-[4px] h-[4px]" />
                                        </div>
                                    </div>
                                </div>

                                {/* Middle part */}
                                <div
                                    ref={messagesEndRef}
                                    className="flex flex-col overflow-y-auto gap-[15px] h-[616px] flex-grow">
                                    {groupedMessages.map((group, index) => (
                                        <div
                                            key={index}
                                            className={`flex mx-[60px] my-[30px] ${group[0].sender === 'Lucidify' ? "justify-end" : "justify-start"
                                                }`}
                                        >
                                            <div className="max-w-[80%]">
                                                {group[0].sender === 'Lucidify' ? (
                                                    <div className="inline-flex gap-[15px]">
                                                        <div className="flex flex-col gap-[10px] items-end">
                                                            <div className="flex items-center gap-[10px]">
                                                                <h3 className="opacity-80 font-light text-[14px]">You</h3>
                                                                <h3 className="font-semibold text-[16px]">You</h3>
                                                            </div>
                                                            <div className="flex flex-col gap-[10px] items-end">
                                                                {group.map((message) => (
                                                                    <div key={message.id} className="inline flex-col gap-[50px]">
                                                                        <div
                                                                            className={`inline-flex text-[14px] font-light rounded-b-[15px] rounded-tl-[15px] px-[15px] py-[10px] ${message.sender === 'Lucidify'
                                                                                ? 'PopupAttentionGradient PopupAttentionShadow'
                                                                                : 'MessagesHighlightGradient ContentCardShadow'
                                                                                }`}
                                                                        >
                                                                            {message.text}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="rounded-[5px] BlackGradient ContentCardShadow inline-flex justify-center items-center self-start">
                                                            <div className="w-[35px] h-[35px] mx-[8px] my-[8px] flex items-center rounded-full overflow-clip">
                                                                <Image
                                                                    src="/Lucidify Umbrella.png"
                                                                    alt="Lucidify PFP"
                                                                    layout="responsive"
                                                                    width={0}
                                                                    height={0}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="inline-flex gap-[15px]">
                                                        <div className="rounded-[5px] BlackGradient ContentCardShadow inline-flex justify-center items-center self-start">
                                                            <div className="w-[30px] h-[30px] mx-[8px] my-[8px] flex items-center rounded-full overflow-clip">
                                                                <Image
                                                                    src={selectedChat.photoURL || '/Lucidify Umbrella.png'} // Use the user's photoURL or a default image
                                                                    alt="Lucidify Logo"
                                                                    layout="responsive"
                                                                    width={0}
                                                                    height={0}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col gap-[10px]">
                                                            <div className="flex items-center gap-[10px]">
                                                                <h3 className="font-semibold text-[16px]">{selectedChat ? selectedChat.displayName || 'Untitled Chat' : 'Loading...'}</h3>
                                                                <h3 className="opacity-80 font-light text-[14px]">{selectedChat ? selectedChat.displayName || 'Untitled Chat' : 'Loading...'}</h3>
                                                            </div>
                                                            <div className="flex flex-col gap-[10px]">
                                                                {group.map((message) => (
                                                                    <div key={message.id} className="inline flex-col gap-[50px]">
                                                                        <div
                                                                            className={`inline-flex text-[14px] font-light rounded-b-[15px] rounded-tr-[15px] px-[15px] py-[10px] ${message.sender === 'Lucidify'
                                                                                ? 'PopupAttentionGradient PopupAttentionShadow'
                                                                                : 'MessagesHighlightGradient ContentCardShadow'
                                                                                }`}
                                                                        >
                                                                            {message.text}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>


                                {/* Bottom part - fixed at the bottom */}
                                <div className="BlackGradient ContentCardShadow rounded-br-[35px] px-[50px] py-[17px] flex gap-[25px] flex-shrink-0">
                                    <div className="BlackWithLightGradient ContentCardShadow rounded-[10px] flex gap-[25px] px-[25px] py-[13px] w-full">
                                        <input
                                            type="text"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            placeholder="Write a Message..."
                                            className="w-full focus:outline-none text-[16px] font-light bg-transparent"
                                        />
                                        <div className="flex gap-[25px] items-center">
                                            <div className="flex gap-[15px]">
                                                <div className="w-[20px] opacity-60 hover:opacity-100 hover:cursor-pointer">
                                                    <Image
                                                        src="/Attachment Icon.png"
                                                        alt="Send Icon"
                                                        layout="responsive"
                                                        width={0}
                                                        height={0}
                                                    />
                                                </div>
                                                <div className="w-[20px] opacity-60 hover:opacity-100 hover:cursor-pointer">
                                                    <Image
                                                        src="/Microphone Icon.png"
                                                        alt="Send Icon"
                                                        layout="responsive"
                                                        width={0}
                                                        height={0}
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                onClick={sendMessage}
                                                className=""
                                            >
                                                <div className="w-[25px]">
                                                    <Image
                                                        src="/Send Icon.png"
                                                        alt="Send Icon"
                                                        layout="responsive"
                                                        width={0}
                                                        height={0}
                                                    />
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DASHBOARDAdminMessages;
