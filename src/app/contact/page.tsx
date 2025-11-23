'use client';

import { useState, useRef, useEffect } from 'react';
import Header from '@/app/Components/header'
import Footer from '@/app/Components/footer'
import { DM_Sans } from 'next/font/google';
import Image from 'next/image';
// import ContactBar from '../Components/topbar';
// import ScrollToTopButton from '../Components/scroll';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeUnit, setActiveUnit] = useState<'unit1' | 'unit2'>('unit1');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          Accept: 'application/json',
        },
      });

      if (res.ok) {
        setSubmitted(true);
        form.reset();
        window.scrollTo({
          top: formRef.current?.offsetTop || 0,
          behavior: 'smooth'
        });
      }
    } catch (err) {
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSubmitted(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  // Unit data
  const unitData = {
    unit1: {
      title: "UNIT 01:",
      address: "Mailing Address: 10 Green St.Unit 4-2oz Woodbridge, NJ 07095 Factory: 1705 Johnson Industrial Dr Excelsior Springs MO. 64024",
      phone: "+1 (732) 498 0299",
    //   email: "info@atozee.net",
      image: "/unit1.png", // Replace with your actual image path
    },
    unit2: {
      title: "UNIT 02:",
      address: "Office # 39, 3rd Floor, RJ Mall Main Rashid Minhas Road Karachi, Pakistan",
      phone: "+92 334184234, +92 3256617590",
    //   email: "info@atozee.net",
      image: "/unit2.png", // Replace with your actual image path
    }
  };

  const ContactSection = () => {
    const unit = unitData[activeUnit];
    
    return (
      <section className={`py-8 px-4 max-w-7xl mx-auto border border-gray-200 bg-gray-50 rounded-lg my-6 ${dmSans.className}`}>
        <div className="grid md:grid-cols-2 gap-6 items-start">
          {/* Contact Info */}
          <div className="space-y-4 pl-2">
            <h2 className="text-xl md:text-2xl font-bold text-black">{unit.title}</h2>      
            <div className="space-y-3">
              <ContactItem 
                icon="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                title="Address:"
                text={unit.address}
              />
              <ContactItem 
                icon="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                title="Tel:"
                text={unit.phone}
              />
              {/* <ContactItem 
                icon="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                title="Email:"
                text={unit.email}
              /> */}
              
              <div className="flex items-center gap-3 pt-3">
                {['instagram', 'facebook', 'linkedin', 'youtube'].map((social) => (
                  <a 
                    key={social}
                    href={`https://www.${social}.com/yourusername`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-600 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
                  >
                    <SocialIcon platform={social as 'instagram' | 'facebook' | 'linkedin' | 'youtube'} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="h-64 sm:h-80 bg-gray-100 rounded-lg overflow-hidden">
            <Image 
              src={unit.image}
              alt={`${unit.title} location`}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback image if the provided image fails to load
                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='18' fill='%236b7280'%3EUnit Image%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
        </div>
      </section>
    );
  };

  const ContactItem = ({ icon, title, text }: { icon: string; title: string; text: string }) => (
    <div className="flex items-start gap-3">
      <div className="bg-black p-2 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
        </svg>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        <p className="text-xs text-gray-600">{text}</p>
      </div>
    </div>
  );

  const SocialIcon = ({ platform }: { platform: 'instagram' | 'facebook' | 'linkedin' | 'youtube' }) => {
    const icons = {
      instagram: (
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
      ),
      facebook: (
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
      ),
      linkedin: (
        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
      ),
      youtube: (
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      )
    };

    return (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        {icons[platform]}
      </svg>
    );
  };

  return (
    <div className={`${dmSans.className} text-gray-800 bg-white`}>
      {/* <ContactBar/> */}
      <Header />

      {/* Unit Selection Buttons */}
      <section className="py-6 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setActiveUnit('unit1')}
            className={`px-8 py-3 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
              activeUnit === 'unit1'
                ? 'bg-black text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            UNIT 01
          </button>
          <button
            onClick={() => setActiveUnit('unit2')}
            className={`px-8 py-3 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
              activeUnit === 'unit2'
                ? 'bg-black text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            UNIT 02
          </button>
        </div>
      </section>

      {/* Dynamic Contact Section */}
      <ContactSection />

      {/* Contact Form */}
      <section className={`py-8 px-4 max-w-4xl mx-auto bg-white my-6 ${dmSans.className}`} ref={formRef}>
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-black">
            Get In Touch With Us
          </h2>
        </div>

        {submitted && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-center text-sm">
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Thank you for your message! We&apos;ll get back to you soon.</span>
            </div>
          </div>
        )}

        <form 
          action="https://formsubmit.co/ajax/info@atozee.net"
          method="POST"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput type="text" name="name" placeholder="Name*" required />
            <FormInput type="tel" name="phone" placeholder="Contact No*" required />
            <FormInput type="text" name="company" placeholder="Company/Reference*" required />
            <FormInput type="text" name="city" placeholder="City*" required />
          </div>

          <FormInput type="email" name="email" placeholder="Email*" required fullWidth />
          
          <textarea
            id="comments"
            name="comments"
            rows={4}
            placeholder="Comments/Questions*"
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-black focus:outline-none transition bg-gray-50 min-h-[100px]"
            required
          ></textarea>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full md:w-64 mx-auto px-4 py-3 rounded text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              'SUBMIT'
            )}
          </button>
        </form>
      </section>

      {/* <ScrollToTopButton/> */}
      <Footer />
    </div>
  );
}

const FormInput = ({ 
  type, 
  name, 
  placeholder, 
  required,
  fullWidth = false
}: {
  type: string;
  name: string;
  placeholder: string;
  required: boolean;
  fullWidth?: boolean;
}) => (
  <div className={fullWidth ? 'col-span-1 md:col-span-2' : ''}>
    <input
      type={type}
      id={name}
      name={name}
      required={required}
      placeholder={placeholder}
      className="w-full px-4 py-3 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-black focus:outline-none transition bg-gray-50"
    />
  </div>
);