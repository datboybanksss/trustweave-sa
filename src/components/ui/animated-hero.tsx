import { MoveRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { WILL_URL } from "@/lib/trust-enquiry";

function Hero() {
  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-8 py-8 lg:py-24">
          <div className="flex flex-col gap-4">
            <h1 className="max-w-3xl text-center font-regular text-5xl tracking-tighter md:text-7xl">
              <span className="block text-foreground">Plan today.</span>
              <span className="block font-semibold text-primary md:pb-4 md:pt-1">
                Build a lasting legacy.
              </span>
            </h1>

            <p className="max-w-2xl text-center text-lg leading-relaxed tracking-tight text-muted-foreground md:text-xl">
              Create your will online, explore trust planning, and take practical steps towards your family’s future.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 px-4 sm:w-auto sm:flex-row">
            <Button asChild size="lg" className="w-full gap-4 sm:w-auto" variant="hero">
              <Link to="/trust-enquiry">
                Enquire about a trust <ShieldCheck className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" className="w-full gap-4 sm:w-auto">
              <a href={WILL_URL} target="_blank" rel="noopener noreferrer">
                Create my will <MoveRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
