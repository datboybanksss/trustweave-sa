import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { WILL_URL } from "@/lib/trust-enquiry";
function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => ["Easy", "Fun", "Understandable"], []);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);
  return <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-8 lg:py-24 items-center justify-center flex-col">
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-foreground">Building Wealth Is</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => <motion.span key={index} className="absolute font-semibold text-primary" initial={{
                opacity: 0,
                y: "-100"
              }} transition={{
                type: "spring",
                stiffness: 50
              }} animate={titleNumber === index ? {
                y: 0,
                opacity: 1
              } : {
                y: titleNumber > index ? -150 : 150,
                opacity: 0
              }}>
                    {title}
                  </motion.span>)}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              The comprehensive platform for South African families and legal professionals to create trusts, manage wealth, and protect generational assets with confidence and ease.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 px-4 sm:w-auto sm:flex-row">
            <Button asChild size="lg" className="w-full gap-4 sm:w-auto" variant="hero">
              <Link to="/trust-enquiry">
                Enquire about a trust <ShieldCheck className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="lg" className="w-full gap-4 sm:w-auto">
              <a href={WILL_URL} target="_blank" rel="noopener noreferrer">
                Create my will <MoveRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>;
}
export { Hero };