import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

export function FaqSection() {
  return (
    <motion.div
      className="mt-24 mb-20"
      viewport={{ once: true }}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <div className="flex flex-col items-center justify-center w-full pt-12">
        <h2 className="mt-6 font-semibold text-center text-3xl xl:text-5xl">
          Frequently Asked Questions
        </h2>
        <p className="max-w-lg mt-4 text-center text-neutral-500">
          Here are some of the most common questions we get asked. If you have a
          question that isn&apos;t answered here, feel free to reach out to us.
        </p>
      </div>

      <div className="max-w-3xl mx-auto w-full mt-20">
        <Accordion type="single" collapsible>
          {Faq.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </motion.div>
  );
}
export const Faq = [
  {
    id: "item-1",
    question: "What is this platform about?",
    answer:
      "Our platform is designed to help creators and innovators showcase their products, gather feedback, and connect with a like-minded community.",
  },
  {
    id: "item-2",
    question: "How much does it cost?",
    answer:
      "We offer a Free plan with essential features, and a Premium plan starting at $9.99/month with added benefits like unlimited product uploads and advanced analytics.",
  },
  {
    id: "item-3",
    question: "How does upvoting work?",
    answer:
      "Upvotes reflect community interest in products. The more upvotes a product receives, the higher it ranks, making it more visible to other users.",
  },
  {
    id: "item-4",
    question: "Can I get feedback on my products?",
    answer:
      "Yes! Users can leave comments on your product page, helping you get valuable feedback to improve your product.",
  },
  {
    id: "item-5",
    question: "How do I upload a product?",
    answer:
      "Simply sign up or log in, then go to your profile page where you'll find an option to upload your product and add details.",
  },
  {
    id: "item-6",
    question: "Is customer support available?",
    answer:
      "Yes, we provide community support for Free users and priority support for Premium subscribers. Our team is here to help!",
  },
  {
    id: "item-7",
    question: "Can I customize my profile?",
    answer:
      "Absolutely! You can personalize your profile to showcase your brand and all the products you have launched.",
  },
  {
    id: "item-8",
    question: "How do I upgrade to the Premium plan?",
    answer:
      "You can easily upgrade to the Premium plan through your account settings. Enjoy enhanced features and more exposure for your products.",
  },
];
