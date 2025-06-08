import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQs = () => {
  return (
    <div className='flex flex-col items-center text-center mt-[140px] gap-10 z-0 relative' id='faqs'>
        <div className='flex flex-col gap-6 items-center'>
        <p className='text-blue-500 font-semibold'>FAQs</p>
        <h1 className='text-5xl font-semibold'>Frequently asked questions</h1>
        <p className='text-gray-400'>Explore answers to common questions</p>
        </div>
        <div className='w-[1350px] flex flex-col items-center'>
        <Accordion type="single" collapsible className='w-3/4 text-2xl font-semibold border-b rounded-b-none border-gray-400'>
            <AccordionItem value="item-1">
                <AccordionTrigger className='text-xl font-medium px-3'>Can I integrate with my existing CRM?</AccordionTrigger>
                <AccordionContent className='px-3'>
                    Yes. Our AI supports direct integration with popular CRMs like HubSpot, Zoho, and Salesforce via Zapier or custom API.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className='w-3/4 text-2xl font-semibold border-b rounded-b-none border-gray-400'>
            <AccordionItem value="item-1">
                <AccordionTrigger className='text-xl font-medium px-3'>How secure is my data?</AccordionTrigger>
                <AccordionContent className='px-3'>
                    We use bank-grade encryption and GDPR-compliant servers. Your client details and property data remain private.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className='w-3/4 text-2xl font-semibold border-b rounded-b-none border-gray-400'>
            <AccordionItem value="item-1">
                <AccordionTrigger className='text-xl font-medium px-3'>Do I need technical skills to set up?</AccordionTrigger>
                <AccordionContent className='px-3'>
                    Not at all. Our 15-minute setup guides and bonus training call make it easy. If you can follow simple instructions, you are good to go.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className='w-3/4 text-2xl font-semibold border-b rounded-b-none border-gray-400'>
            <AccordionItem value="item-1">
                <AccordionTrigger className='text-xl font-medium px-3'>What if I am not satisfied after 30 days?</AccordionTrigger>
                <AccordionContent className='px-3'>
                    Just let us know. Our 10-Hour Return Guarantee ensures you get a full refund if you do not save at least 10 hours in your first month.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
        </div>
    </div>
  )
}

export default FAQs