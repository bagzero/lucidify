import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Adjust the path as needed
import { useAuth } from '@/context/authContext'; // Import your AuthContext
import { useRouter } from 'next/navigation';    // Import Next.js router

interface CreateProjectPopupProps {
    closeCreatProjectPopup: () => void;
    isVisible: boolean;
}

interface FormData {
    projectName: string;
    dueDate: string;
    estimatedBudget: string;
    paymentPlan: string;
    maintenancePlan: string;
    subpages: string[];
    logoUrl: string;
}

// Function to get the ordinal suffix
const getOrdinal = (n: number): string => {
    const suffixes = ["th", "st", "nd", "rd"];
    const value = n % 100;
    return suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0];
};

const CreateProjectPopup: React.FC<CreateProjectPopupProps> = ({ closeCreatProjectPopup, isVisible }) => {
    const { user } = useAuth();  // Access the authenticated user
    const router = useRouter();  // Access the router

    // Redirect to login if there's no user
    useEffect(() => {
        if (!user) {
            router.push("/login");  // Redirect the user to the login page
        }
    }, [user, router]);

    const [formData, setFormData] = useState({
        projectName: '',
        dueDate: '',
        projectDescription: '',
        designInspiration1: '',
        designInspiration2: '',
        logoAttachment: null,
        platform: '',
        subpages: [],
        estimatedBudget: '',
        paymentPlan: 0,
        weeksPaid: 0,
        notes: '',
        additionalAttachment: null,
        approval: 'Pending',
        dateCreated: new Date().toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }).replace(/(\d+)/, (match) => `${match}${getOrdinal(parseInt(match))}`), // Append ordinal suffix
        progress: '5',
        recentActivity: 'Project sent to Lucidify',
        comments: '',
        status: 1,
        paymentStatus: 'Not Started',
        paymentStartDate: null,
        paymentAmount: 0, //amount per week
        autoPay: true,
        websiteDesignCount: 0,
        websiteDesignStatus: 'Not Started',
        maintenancePlan: false,
        maintenanceAmount: 100,
        maintenanceStatus: 'Not Started',
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    // Handle file upload for attachments
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setFormData((prevState) => ({
            ...prevState,
            additionalAttachment: file,
        }));
    };

    // Handle Maintenance Plan selection
    const handleMaintenancePlanSelection = (plan: boolean) => {
        setFormData((prevState) => ({
            ...prevState,
            maintenancePlan: plan,
        }));
    };

    // Handle notes change
    const handleNotesChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            notes: e.target.value,
        }));
    };


    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    // Handle logo upload
    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setFormData((prevState) => ({
            ...prevState,
            logoAttachment: file,
        }));
    };

    // Handle subpage toggle (button acting like a checkbox)
    const handleSubpageToggle = (subpage: string) => {
        const updatedSubpages = formData.subpages.includes(subpage)
            ? formData.subpages.filter((page) => page !== subpage)
            : [...formData.subpages, subpage];
        setFormData((prevState) => ({
            ...prevState,
            subpages: updatedSubpages,
        }));
    };


    // Handle checkbox selections for subpages
    const handleSubpageSelection = (subpage: string) => {
        setFormData((prevState) => ({
            ...prevState,
            subpages: prevState.subpages.includes(subpage)
                ? prevState.subpages.filter((page) => page !== subpage)
                : [...prevState.subpages, subpage],
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            console.error('User is not logged in');
            return;
        }
        try {
            // Reference to the user's projects subcollection
            const userProjectsRef = collection(db, `users/${user.uid}/projects`);
            await addDoc(userProjectsRef, formData);

            setIsSubmitted(true);

            // Refresh the page
            window.location.reload();
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };


    return (
        <div
            className={`h-screen bg-black bg-opacity-50 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none translate-y-[50px]'
                } fixed inset-x-0 flex justify-center items-center z-20`}
        >
            <form
                className="relative flex max-h-[83vh] overflow-y-auto flex-col items-start px-[50px] py-5 BlackGradient ContentCardShadow rounded-[50px]"
                onSubmit={handleSubmit}
            >
                <div className="inline-flex items-center justify-center gap-5 ">
                    <div className="w-[50px]">
                        <Image
                            src="/Lucidify Umbrella.png"
                            alt="Lucidify Logo"
                            layout="responsive"
                            width={0}
                            height={0}
                        />
                    </div>
                    <div className=" font-semibold  text-[34px] leading-[normal]">
                        Create new project.
                    </div>
                </div>
                <div className="flex flex-col w-[35px] h-[35px] items-center justify-center gap-2.5 p-1.5 absolute right-[50px] rounded-[100px] CloseCreateProjectPoppupGradient ContentCardShadow hover:cursor-pointer" onClick={closeCreatProjectPopup}>
                    <div className=" w-[20px] rotate-45">
                        <Image src="/Plus Icon.png" alt="Plus Icon" layout="responsive" width={0} height={0} />
                    </div>
                </div>

                <div className="w-full my-[15px] opacity-25 border-[1.5px] border-[#808080] rounded-full" />

                <div className="inline-flex flex-col items-start gap-[50px]">
                    <div className="inline-flex flex-col items-start gap-2.5">
                        <div className="font-semibold text-xl">Project Details</div>
                        <div className="flex items-start gap-[15px] w-full">
                            <div className="inline-flex items-start gap-2.5 self-stretch">
                                <div className="flex w-[30px] h-[30px] items-center justify-center gap-2.5 rounded-[100px] PopupAttentionGradient PopupAttentionShadow">
                                    <div>1</div>
                                </div>
                                <div className="w-0.5 bg-[#80808040] rounded-[100px]" />
                            </div>
                            <div className="flex flex-wrap w-[1037px] items-center justify-between gap-[15px_15px]">
                                {/* Project Name */}
                                <div className="flex flex-col w-[492px] items-start gap-[13px]">
                                    <p className="text-sm">
                                        Project Name<span className="text-[#998af8]">*</span>
                                    </p>
                                    <input
                                        id="projectName"
                                        type="text"
                                        value={formData.projectName}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Ottoman - Redesign Landing Page"
                                        required
                                        className="max-h-[38px] w-full rounded-[10px] px-[17px] py-2.5 LightGrayGradient ContentCardShadow text-xs"
                                    />
                                </div>

                                {/* Estimated Due Date */}
                                <div className="flex flex-col w-[492px] items-start gap-[13px]">
                                    <p className="text-sm">
                                        Estimated Due Date<span className="text-[#998af8]">*</span>
                                    </p>
                                    <input
                                        id="dueDate"
                                        type="date"
                                        value={formData.dueDate}
                                        onChange={handleInputChange}
                                        required
                                        className="max-h-[38px] w-full rounded-[10px] px-[17px] py-2.5 LightGrayGradient ContentCardShadow text-xs"
                                    />
                                </div>

                                {/* Project Description */}
                                <div className="flex flex-col w-[492px] items-start gap-[13px]">
                                    <p className="text-sm">
                                        Project Description<span className="text-[#998af8]">*</span>
                                    </p>
                                    <input
                                        id="projectDescription"
                                        value={formData.projectDescription}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Redesigning Ottoman’s landing page to increase revenue and customer traffic. Expecting a increase in incoming traffic of at least 50%."
                                        required
                                        className="max-h-14 w-full rounded-[10px] px-[17px] py-2.5 LightGrayGradient ContentCardShadow text-xs"
                                    />
                                </div>

                                {/* Upload Logo */}
                                <div className="flex flex-col w-[492px] items-start gap-[13px]">
                                    <div className="text-sm leading-[normal]">Upload Logo (Optional)</div>
                                    <div className="flex max-h-[38px] h-[38px] items-center gap-[19px] px-0 py-2.5 w-full rounded-[10px]">
                                        <div className="flex w-[38px] h-[38px] items-center justify-center gap-2.5 rounded-[100px] BlackWithLightGradient ContentCardShadow">
                                            <div className="w-[20px]">
                                                <Image src="/Upload Icon.png" alt="Upload Icon" layout="responsive" width={0} height={0} />
                                            </div>
                                        </div>
                                        <label className="w-[246px] text-xs leading-[normal]">
                                            <span className="font-normal text-xs">Drag &amp; Drop your files here or </span>
                                            <span className="underline">Choose file</span>
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={handleFileUpload}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Website Requirements */}
                    <div className="inline-flex flex-col items-start gap-2.5">
                        <div className="font-semibold text-xl">Website Requirements</div>
                        <div className="flex items-start gap-[15px] w-full">
                            <div className="inline-flex items-start gap-2.5 self-stretch">
                                <div className="flex w-[30px] h-[30px] items-center justify-center gap-2.5 rounded-[100px] PopupAttentionGradient PopupAttentionShadow">
                                    <div>2</div>
                                </div>
                                <div className="w-0.5 bg-[#80808040] rounded-[100px]" />
                            </div>
                            <div className="w-[1037px] justify-between flex flex-wrap items-center gap-[0px_15px]">
                                {/* Left Side */}
                                <div className="flex flex-col w-[492px] gap-[18px]">


                                    {/* Platform Selection */}
                                    <div className="flex flex-col w-[492px] items-start gap-[18px]">
                                        <div className="flex flex-col items-start gap-[13px] w-full">
                                            <p className="text-sm">
                                                Platform<span className="text-[#998af8]">*</span>
                                            </p>
                                            <div className="flex items-center justify-between w-full">
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, platform: 'Custom Code' })}
                                                    className={`inline-flex items-center justify-center px-[15px] py-[8.5px] rounded-[5px] ${formData.platform === 'Custom Code' ? 'PopupAttentionGradient' : 'BlackGradient'
                                                        } ContentCardShadow text-xs`}
                                                >
                                                    Custom Code
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, platform: 'WordPress' })}
                                                    className={`inline-flex items-center justify-center px-[15px] py-[8.5px] rounded-[5px] ${formData.platform === 'WordPress' ? 'PopupAttentionGradient' : 'BlackGradient'
                                                        } ContentCardShadow text-xs`}
                                                >
                                                    WordPress
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, platform: 'Shopify' })}
                                                    className={`inline-flex items-center justify-center px-[15px] py-[8.5px] rounded-[5px] ${formData.platform === 'Shopify' ? 'PopupAttentionGradient' : 'BlackGradient'
                                                        } ContentCardShadow text-xs`}
                                                >
                                                    Shopify
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, platform: 'Wix' })}
                                                    className={`inline-flex items-center justify-center px-[15px] py-[8.5px] rounded-[5px] ${formData.platform === 'Wix' ? 'PopupAttentionGradient' : 'BlackGradient'
                                                        } ContentCardShadow text-xs`}
                                                >
                                                    Wix
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, platform: 'Unsure' })}
                                                    className={`inline-flex items-center justify-center px-[15px] py-[8.5px] rounded-[5px] ${formData.platform === 'Unsure' ? 'PopupAttentionGradient' : 'BlackGradient'
                                                        } ContentCardShadow text-xs`}
                                                >
                                                    Unsure
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Design Inspirations */}
                                    <div className="flex flex-col w-[492px] items-start gap-[18px]">
                                        <div className="flex flex-col items-start gap-[13px] w-full">
                                            <p className="text-sm">
                                                Design Inspirations (Optional)
                                            </p>
                                            <div className="flex items-center justify-between w-full">
                                                {/* */}
                                                <div className="flex flex-col w-[235px] items-start gap-[13px]">

                                                    <input
                                                        id="designInspiration1"
                                                        type="text"
                                                        value={formData.designInspiration1}
                                                        placeholder="e.g. https://www.chick-fil-a.com/"
                                                        onChange={handleInputChange}
                                                        className="max-h-[38px] w-full rounded-[10px] px-[17px] py-2.5 LightGrayGradient ContentCardShadow text-xs"
                                                    />
                                                </div>

                                                {/* */}
                                                <div className="flex flex-col w-[235px] items-start gap-[13px]">
                                                    <input
                                                        id="designInspiration2"
                                                        type="text"
                                                        value={formData.designInspiration2}
                                                        placeholder="e.g. https://www.ford.com/"
                                                        onChange={handleInputChange}
                                                        className="max-h-[38px] w-full rounded-[10px] px-[17px] py-2.5 LightGrayGradient ContentCardShadow text-xs"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Subpages Section */}
                                <div className="inline-flex flex-col items-start gap-2.5 w-[492px] h-[159px]">
                                    <p className="text-sm">
                                        Subpages (Optional)
                                    </p>
                                    <div className="flex flex-wrap gap-[15px_20px] w-full justify-center">
                                        {['About', 'Services', 'Contact', 'Testimonials', 'FAQ', 'Pricing', 'Gallery', 'Events', 'Menu', 'Online Ordering', 'Reservations', 'Custom'].map((subpage) => (
                                            <button
                                                type="button"
                                                key={subpage}
                                                onClick={() => handleSubpageToggle(subpage)}
                                                className={`px-4 py-2 rounded-[10px] text-white text-[12px] ${formData.subpages.includes(subpage)
                                                    ? 'PopupAttentionGradient PopupAttentionShadow'
                                                    : 'BlackGradient ContentCardShadow'
                                                    }`}
                                            >
                                                {subpage}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Details */}
                    <div className="inline-flex flex-col items-start gap-2.5">
                        <div className="inline-flex items-center justify-center gap-2.5">
                            <div className="font-semibold text-xl leading-[normal]">Payment Details</div>
                            <div className="inline-flex items-center justify-center gap-[5px]">
                                <div className="flex flex-col w-[18px] h-[18px] items-center justify-center gap-2.5 px-[5px] py-0 rounded-[100px] LightGrayGradient ContentCardShadow">
                                    <div className="text-[10px] leading-[normal]">i</div>
                                </div>
                                <p className="text-[#ffffffa6] text-xs leading-[normal]">
                                    We only start charging after you decide to proceed with one of our free web designs.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-[15px] w-full">
                            <div className="inline-flex items-start gap-2.5  self-stretch">
                                <div className="flex w-[30px] h-[30px] items-center justify-center gap-2.5  rounded-[100px] PopupAttentionGradient PopupAttentionShadow">
                                    <div className="  leading-[normal]">
                                        3
                                    </div>
                                </div>
                                <div className=" w-0.5 bg-[#80808040] rounded-[100px]" />
                            </div>
                            <div className="flex flex-col flex-wrap w-[1037px] gap-[15px]">

                                {/* Estimated Budget */}
                                <div className="flex flex-col items-start gap-[13px]">
                                    <p className="text-sm">
                                        Estimated Budget<span className="text-[#998af8]">*</span>
                                    </p>
                                    <div className="flex items-center gap-[30px] w-full">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, estimatedBudget: '$500-$1k' })}
                                            className={`inline-flex items-center justify-center px-[15px] py-[8.5px] rounded-[5px] ${formData.estimatedBudget === '$500-$1k' ? 'PopupAttentionGradient' : 'BlackGradient'
                                                } ContentCardShadow text-xs`}
                                        >
                                            $500-$1k
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, estimatedBudget: '$1k-$2k' })}
                                            className={`inline-flex items-center justify-center px-[15px] py-[8.5px] rounded-[5px] ${formData.estimatedBudget === '$1k-$2k' ? 'PopupAttentionGradient' : 'BlackGradient'
                                                } ContentCardShadow text-xs`}
                                        >
                                            $1k-$2k
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, estimatedBudget: '$2k-$3k' })}
                                            className={`inline-flex items-center justify-center px-[15px] py-[8.5px] rounded-[5px] ${formData.estimatedBudget === '$2k-$3k' ? 'PopupAttentionGradient' : 'BlackGradient'
                                                } ContentCardShadow text-xs`}
                                        >
                                            $2k-$3k
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, estimatedBudget: '$3k+' })}
                                            className={`inline-flex items-center justify-center px-[15px] py-[8.5px] rounded-[5px] ${formData.estimatedBudget === '$3k+' ? 'PopupAttentionGradient' : 'BlackGradient'
                                                } ContentCardShadow text-xs`}
                                        >
                                            $3k+
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, estimatedBudget: 'Unsure' })}
                                            className={`inline-flex items-center justify-center px-[15px] py-[8.5px] rounded-[5px] ${formData.estimatedBudget === 'Unsure' ? 'PopupAttentionGradient' : 'BlackGradient'
                                                } ContentCardShadow text-xs`}
                                        >
                                            Unsure
                                        </button>
                                    </div>
                                </div>

                                {/* Payment Plan */}
                                <div className="flex flex-col items-start gap-[13px]">
                                    <p className="text-sm">
                                        Payment Plan<span className="text-[#998af8]">*</span>
                                    </p>

                                    <div className="flex items-center gap-[30px] w-full">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, paymentPlan: 1 })}
                                            className={`inline-flex items-center justify-center px-[15px] py-[8.5px] rounded-[5px] ${formData.paymentPlan === 1 ? 'PopupAttentionGradient' : 'BlackGradient'
                                                } ContentCardShadow text-xs`}
                                        >
                                            100% Upfront
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, paymentPlan: 2 })}
                                            className={`inline-flex items-center justify-center px-[15px] py-[8.5px] rounded-[5px] ${formData.paymentPlan === 2 ? 'PopupAttentionGradient' : 'BlackGradient'
                                                } ContentCardShadow text-xs`}
                                        >
                                            2 Weekly (50%)
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, paymentPlan: 3 })}
                                            className={`inline-flex items-center justify-center px-[15px] py-[8.5px] rounded-[5px] ${formData.paymentPlan === 3 ? 'PopupAttentionGradient' : 'BlackGradient'
                                                } ContentCardShadow text-xs`}
                                        >
                                            3 Weekly (33%)
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, paymentPlan: 4 })}
                                            className={`inline-flex items-center justify-center px-[15px] py-[8.5px] rounded-[5px] ${formData.paymentPlan === 4 ? 'PopupAttentionGradient' : 'BlackGradient'
                                                } ContentCardShadow text-xs`}
                                        >
                                            4 Weekly (25%)
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, paymentPlan: 5 })}
                                            className={`inline-flex items-center justify-center px-[15px] py-[8.5px] rounded-[5px] ${formData.paymentPlan === 5 ? 'PopupAttentionGradient' : 'BlackGradient'
                                                } ContentCardShadow text-xs`}
                                        >
                                            5 Weekly (20%)
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Maintenance Plan Section */}
                    <div className="inline-flex flex-col items-start gap-2.5">
                        <div className="inline-flex items-center justify-center gap-2.5">
                            <div className="font-semibold text-xl leading-[normal]">Maintenance Plan</div>
                            <div className="inline-flex items-center justify-center gap-[5px]">
                                <div className="flex flex-col w-[18px] h-[18px] items-center justify-center gap-2.5 px-[5px] py-0 rounded-[100px] LightGrayGradient ContentCardShadow">
                                    <div className="text-[10px] leading-[normal]">i</div>
                                </div>
                                <p className="text-[#ffffffa6] text-xs leading-[normal]">
                                    Continued website maintenance includes all custom changes to the website, additional sections, and fixing all bugs.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-[15px] w-full">
                            <div className="inline-flex items-start gap-2.5 self-stretch">
                                <div className="flex w-[30px] h-[30px] items-center justify-center gap-2.5 rounded-[100px] PopupAttentionGradient PopupAttentionShadow">
                                    <div className="leading-[normal]">4</div>
                                </div>
                                <div className="w-0.5 bg-[#80808040] rounded-[100px]" />
                            </div>
                            <div className="flex flex-col w-[1037px] items-start gap-[15px]">
                                <div className="flex flex-col w-[1037px] items-start gap-[13px]">
                                    <p className="text-sm leading-[normal]">
                                        Would you like the maintenance plan? ($100 / month AFTER the development of the website)
                                        <span className="text-[#998af8]">*</span>
                                    </p>
                                    <div className="flex items-center gap-[30px] w-full">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, maintenancePlan: true })}
                                            className={`inline-flex items-center justify-center px-[15px] py-[8.5px] rounded-[5px] ${formData.maintenancePlan === true ? 'PopupAttentionGradient' : 'BlackGradient'
                                                } ContentCardShadow text-xs`}
                                        >
                                            Yes
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, maintenancePlan: false })}
                                            className={`inline-flex items-center justify-center px-[15px] py-[8.5px] rounded-[5px] ${formData.maintenancePlan === false ? 'PopupAttentionGradient' : 'BlackGradient'
                                                } ContentCardShadow text-xs`}
                                        >
                                            No
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, maintenancePlan: 'Unsure' })}
                                            className={`inline-flex items-center justify-center px-[15px] py-[8.5px] rounded-[5px] ${formData.maintenancePlan === 'Unsure' ? 'PopupAttentionGradient' : 'BlackGradient'
                                                } ContentCardShadow text-xs`}
                                        >
                                            Unsure
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Information Section */}
                    <div className="flex flex-col w-[1094px] items-start gap-2.5">
                        <div className="font-semibold text-xl leading-[normal]">Additional Information</div>

                        <div className="flex items-start gap-[15px] w-full">
                            <div className="inline-flex items-start gap-2.5 self-stretch">
                                <div className="flex w-[30px] h-[30px] items-center justify-center gap-2.5 rounded-[100px] [background:linear-gradient(180deg,rgb(45.69,45.69,45.69)_0.01%,rgb(31.88,31.88,31.88)_100%)]">
                                    <div className="leading-[normal]">5</div>
                                </div>
                                <div className="w-0.5 bg-[#80808040] rounded-[100px]" />
                            </div>

                            <div className="flex w-full justify-between">
                                {/* Notes for Lucidify */}
                                <div className="flex flex-col w-[492px] items-start gap-[18px]">
                                    <div className="flex flex-col items-start gap-[13px] w-full">
                                        <div className="text-sm leading-[normal]">Notes for Lucidify (Optional)</div>
                                        <input
                                            className="max-h-[38px] w-full rounded-[10px] px-[17px] py-2.5 LightGrayGradient ContentCardShadow text-xs"
                                            value={formData.notes}
                                            onChange={handleNotesChange}
                                            placeholder="Anything else?"
                                        />
                                    </div>
                                </div>

                                {/* Other Attachments */}
                                <div className="flex flex-col w-[492px] items-start gap-[13px]">
                                    <div className="text-sm leading-[normal]">Other Attachments (Optional)</div>
                                    <div className="flex max-h-[38px] h-[38px] items-center gap-[19px] px-0 py-2.5 w-full rounded-[10px]">
                                        <div className="flex w-[38px] h-[38px] items-center justify-center gap-2.5 rounded-[100px] BlackWithLightGradient ContentCardShadow">
                                            <div className="w-[20px]">
                                                <Image src="/Upload Icon.png" alt="Upload Icon" layout="responsive" width={0} height={0} />
                                            </div>
                                        </div>
                                        <label className="w-[246px] text-xs leading-[normal]">
                                            <span className="font-normal text-xs">Drag &amp; Drop your files here or </span>
                                            <span className="underline">Choose file</span>
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={handleFileUpload}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
                <div className="w-full my-[15px] opacity-25 border-[1.5px] border-[#808080] rounded-full" />

                <button
                    type="submit"
                    className="py-[8px] w-full inline-flex items-center justify-center PopupAttentionGradient PopupAttentionShadow text-[16px] rounded-[10px]"
                >
                    Create Project
                </button>
            </form>
        </div>
    );
};

export default CreateProjectPopup;
