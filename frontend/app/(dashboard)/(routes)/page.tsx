import Image from 'next/image';
import React from 'react'
import logo from '../../../assets/images/adaptive-icon.png';
import courseBanner from "../../../assets/images/BannerPng.png";

import Link from 'next/link';

type Props = {}

const Dashboard = (props: Props) => {
  return (
    <div className=" relative min-h-screen bg-gray-100 flex flex-col items-center">
           <div className=" absolute top-3 left-3 flex items-center bg-white p-2 rounded-md">
          <Image src={logo} alt="Logo" width={50} height={50} />
          <h1 className="ml-4 text-xl font-bold text-indigo-500">Admin Dashboard</h1>
        </div>


    <main className="flex-1 flex flex-col items-center justify-center">
      <section className="text-center pt-28 py-20">
        <h2 className="text-4xl font-bold text-indigo-500">Welcome to the Admin Dashboard</h2>
        <p className="mt-4 text-lg text-gray-600">Manage student testimonials, courses, categories, and much more!</p>
        <div className="mt-8">
          <Link href="/" className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700">Get Started</Link>
        </div>
      </section>

      <section id="features" className="max-w-7xl mx-auto py-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center">Features</h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard title="Manage Testimonials" description="Easily manage student testimonials with full control." />
          <FeatureCard title="Course Management" description="Create, update, and delete courses with ease." />
          <FeatureCard title="Category Management" description="Organize your courses into categories effortlessly." />
          <FeatureCard title="Student Data Management" description="Handle and manage all student data securely." />
          <FeatureCard title="User Subscriptions" description="Manage user subscriptions and billing information." />
          <FeatureCard title="Advanced Analytics" description="Get detailed insights and analytics on user activities." />
        </div>
      </section>

      <section id="courses" className="max-w-7xl mx-auto py-20 px-6">
  <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Courses</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <CourseCard 
      price={950} 
      title="Course Management" 
      description="This is an absolutely great course for beginners to advanced level learners. Those who are interested in learning new technology, please join this course to master this technology."
    />
     <CourseCard 
      price={1600} 
      title="Advance course" 
      description="This is an absolutely great course for beginners to advanced level learners. Those who are interested in learning new technology, please join this course to master this technology."
    />
    {/* Add more CourseCard components as needed */}
  </div>
</section>

      <section id="pricing" className="max-w-7xl mx-auto py-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center">Pricing</h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingCard plan="Basic" price="₹99.99/week" features={["Manage testimonials", "Course management", "---------------"]} />
          <PricingCard plan="Pro" price="₹150.99/month" features={["Everything in Basic", "----------------", "-----------------"]} />
          <PricingCard plan="Enterprise" price="₹999.99/year" features={["Everything in Pro", "-----------------", "----------------"]} />
        </div>
      </section>

      <section id="contact" className="max-w-7xl mx-auto p-20 bg-gray-50 text-center shadow-md mb-4">
        <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
        <p className="mt-4 text-lg text-gray-600">Have questions? Get in touch with us!</p>
        <div className="mt-8">
          <p className=" text-center ">Email Us: elearner@gmail.com</p>
        </div>
      </section>
    </main>

    <footer className="bg-white w-full py-6">
      <div className="max-w-7xl mx-auto text-center text-gray-600">
        © 2024 ELearner. All rights reserved.
      </div>
    </footer>
  </div>
  )
}

const FeatureCard = ({ title, description }:{title:string, description: string}) => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
    <p className="mt-4 text-gray-600">{description}</p>
  </div>
);

const CourseCard = ({ title, description, price }:{title: string, description: string, price: number}) => (
  <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
    <Image alt='Course image' src={courseBanner} className='h-[300px] w-full object-cover rounded-md' />
    <div className='mt-2 flex flex-col justify-between'>
      <div>
        <p className='text-2xl font-bold text-gray-800'>{title}</p>
        <p className='text-gray-600 mt-4'>{description}</p>
      </div>
      <div>
        <p className='text-blue-600 font-bold text-xl mt-4 md:mt-6'>₹{price}</p>
        <button className="px-6 py-2 mt-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300">Enroll Now</button>
      </div>
    </div>
  </div>
);


const PricingCard = ({ plan, price, features }:{plan: string, price: string, features: string[]}) => (
  <div className="p-6 px-10 bg-white rounded-lg shadow-md text-center">
    <h3 className="text-xl font-bold text-gray-900">{plan}</h3>
    <p className="mt-4 text-2xl text-gray-900">{price}</p>
    <ul className="mt-4 space-y-2 text-gray-600">
      {features.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
    <div className="mt-8 mx-5">
      <div className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700">Subscribe</div>
    </div>
  </div>
);

export default Dashboard