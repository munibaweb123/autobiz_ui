import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

const AuthCard = ({ title, description, children }: AuthCardProps) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center 
      bg-gradient-to-br from-[#e8f1ff] via-[#f2faff] to-[#e9fff2] p-4">

      <Card className="
        w-full max-w-md
        bg-white/80 backdrop-blur-md
        border border-gray-200
        shadow-2xl rounded-2xl 
        p-6
        animate-fadeIn
      ">
        <CardHeader className="space-y-3 text-center pb-2">
          {/* Logo + Brand */}
          <div className="flex items-center justify-center gap-2 mb-1">
            <Sparkles className="h-7 w-7 text-blue-600" />
            <CardTitle className="text-2xl font-bold text-blue-600 tracking-tight">
              BizzAuto
            </CardTitle>
          </div>

          {/* Subtitle */}
          <CardDescription className="text-sm text-gray-500">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-2 space-y-4">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCard;
