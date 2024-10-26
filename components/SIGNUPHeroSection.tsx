"use client"

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, getRedirectResult } from "firebase/auth";
import { auth, db } from '../firebaseConfig';
import Link from 'next/link';
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const SIGNUPHeroSection = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1);

  // Handle Google Sign-up with redirect
  // Handle Google Sign-up with redirect
  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      if (result.user) {
        const userId = result.user.uid;
        const userRef = doc(db, "users", userId);

        // Check if the user already exists in Firestore
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) {
          // Extract first name from the displayName
          const displayName = result.user.displayName || '';
          const firstName = displayName.split(' ')[0]; // Get the first name
          const photoURL = result.user.photoURL; // Get the profile picture URL

          // Create a Firestore document for the new user
          await setDoc(userRef, {
            email: result.user.email,
            displayName: result.user.displayName,
            firstName: firstName,  // Store first name separately
            photoURL: photoURL,  // Store profile picture URL
            createdAt: new Date(),
          });

          // Create the "Lucidify" pinned conversation
          const conversationsRef = collection(db, "users", userId, "conversations");
          const pinnedConversationRef = await addDoc(conversationsRef, {
            title: "Lucidify",
            isPinned: true,
            unreadMessagesCount: 1,
            lastMessage: "", // Will be updated after the first message
            lastMessageSender: "", // Will be updated after the first message
            timestamp: new Date(), // Will be updated after the first message
          });

          // Add the first message in the "messages" subcollection of the pinned conversation
          const messagesRef = collection(db, "users", userId, "conversations", pinnedConversationRef.id, "messages");
          const firstMessage = {
            text: "Welcome to Lucidify! We're excited to help you get started with your project.",
            sender: "Lucidify",
            timestamp: new Date(),
            isRead: false,
          };

          await addDoc(messagesRef, firstMessage);

          // Update the parent conversation with the latest message info
          await updateDoc(pinnedConversationRef, {
            lastMessage: firstMessage.text,
            lastMessageSender: firstMessage.sender,
            timestamp: firstMessage.timestamp,
          });
        }

        // Redirect to the dashboard after successful Google sign-in
        router.push("/dashboard");
      } else {
        console.log("User sign-in failed or was cancelled.");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };


  // Handle email sign-up
  const handleEmailSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Create user document in Firestore
      await setDoc(doc(db, "users", userId), {
        email: userCredential.user.email,
        // Add any other initial fields you want to store for a new user
      });

      router.push("/dashboard");
    } catch (error) {
      setError("Failed to create an account. Please try again.");
      console.error("Email/Password Sign-Up Error:", error);
    }
  };

  // Handle the result of Google redirect sign-up
  useEffect(() => {
    const fetchRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Google Redirect Error:", error);
      }
    };
    fetchRedirectResult();
  }, [router]);

  // Move to the next step with animation
  const handleContinue = () => {
    setStep(2);  // Switch to step 2
    setTimeout(() => {

      const section1 = document.getElementById("SignUpSection1");
      const section2 = document.getElementById("SignUpSection2");


      // Check if section2 exists before accessing its properties
      if (section2) {
        section2.style.transform = "translateX(0)";
        section2.style.opacity = "1";
      }
    }, 0);  // Small delay to ensure animation triggers smoothly
  };


  return (
    <div className="relative flex justify-center items-center min-h-screen BackgroundGradient overflow-clip">
      {/* Left Decorative Image */}
      <div className="w-[18%] absolute left-[10%] top-[27%] my-auto z-10">
        <Image
          src="/3D Astronaut.png"
          alt="Left Decorative Image"
          layout="responsive"
          width={0}
          height={0}
        />
      </div>

      {/* Right Decorative Image */}
      <div className="-right-[17%] bottom-[57%] w-[50%] absolute">
        <Image
          src="/3D Earth.png"
          alt="Right Decorative Image"
          layout="responsive"
          width={0}
          height={0}
        />
      </div>

      {/* Signup Form */}
      <div className={`relative min-w-[500px] z-10 bg-gradient-to-br from-[#d6ceff] via-white/100 to-white rounded-[30px] px-8 py-10 text-center RegBoxShadow`}>
        {/* Rocket Icon */}
        <div className="w-[113px] absolute -top-[120px] -left-[10%] transform -translate-x-1/2">
          <Image
            src="/3D Invis Rocket.png"
            alt="Rocket Decorative Image"
            layout="responsive"
            width={0}
            height={0}
          />
        </div>

        <div
          className="transition-transform duration-500 ease-in-out overflow-x-hidden px-[1px]"
        >
          {step === 1 && (
            <div id="SignUpSection1">


              {/* Step 1: Google Signup or Email Input */}
              <div className="flex flex-col items-center mb-[40px]">
                <h1 className="text-[26px] font-semibold text-black mb-[6px]">Create an Account</h1>
                <h3 className="text-black text-[15px] text-center opacity-65">Sign up to Lucidify & start growing your business!</h3>
              </div>

              {/* Google Sign-Up Button */}
              <button
                onClick={handleGoogleSignUp}
                className="w-full bg-[rgba(0,0,0,1)] hover:bg-[rgba(0,0,0,0.80)] py-2 rounded-lg flex items-center justify-center ThreeD mb-4"
              >
                <div className="w-[15px] mr-[10px]">
                  <Image
                    src="/Google Icon.png"
                    alt="Google Icon"
                    layout="responsive"
                    width={0}
                    height={0}
                  />
                </div>
                Sign up with Google
              </button>

              <div className="flex items-center mb-[25px] mt-[30px]">
                <div className="h-[1px] bg-gray-300 w-[100%]"></div>
                <p className="text-gray-500 mx-[10px]">or</p>
                <div className="h-[1px] bg-gray-300 w-[100%]"></div>
              </div>

              {/* Email Input and Continue Button */}
              <div className="flex flex-col items-start">
                <h3 className="text-black text-[14px] font-medium">Email</h3>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-black bg-[rgba(255,255,255,0.10)] shadow-sm shadow-gray-400 rounded-lg p-2 mt-[3px] focus:outline-none focus:ring-1 focus:ring-[rgba(0,0,0,0.25)]"
                  required
                />
              </div>

              <button
                className={`w-full ${email ? "text-white" : "text-[rgba(0,0,0,0.5)]"} py-2 mt-4 rounded-lg bg-${email ? "[#725CF7]" : "[rgba(114,92,247,0.5)]"} shadow-lg shadow-indigo-300 ${email && "hover:bg-[#5D3AEA]"}`}
                onClick={handleContinue}  // Trigger transition
                disabled={!email}
              >
                Continue
              </button>
              <p className="text-gray-500 text-[14px] mt-[40px]">
                Already have an account? <Link href="/login" className="text-black font-medium hover:text-opacity-70">Log In</Link>
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="translate-x-[300px] opacity-0" id="SignUpSection2">
              {/* Step 2: Password Input */}
              <div className="flex flex-col items-center mb-[40px]">
                <h1 className="text-[26px] font-semibold text-black mb-[6px]">Almost There!</h1>
                <h3 className="text-black text-[15px] text-center opacity-65">Enter your password to complete your sign-up.</h3>
              </div>

              {/* Email/Password Sign-Up Form */}
              <form onSubmit={handleEmailSignUp}>
                <div className="flex flex-col items-start">
                  <h3 className="text-black text-[14px] font-medium">Password</h3>
                  <input
                    type="password"
                    placeholder="Password (min. 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-black bg-[rgba(255,255,255,0.10)] shadow-sm shadow-gray-400 rounded-lg p-2 mt-[3px] mb-4 focus:outline-none focus:ring-1 focus:ring-[rgba(0,0,0,0.25)]"
                    required
                  />
                </div>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <button
                  type="submit"
                  className="w-full text-white py-2 rounded-lg bg-[#725CF7] shadow-lg shadow-indigo-300 hover:bg-[#5D3AEA]"
                >
                  Complete Sign Up
                </button>
              </form>


            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SIGNUPHeroSection;
