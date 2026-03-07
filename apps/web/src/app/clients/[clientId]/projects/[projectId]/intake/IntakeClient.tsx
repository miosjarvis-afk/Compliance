"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Shield,
  Target,
  Users,
  Database,
  Wrench,
  Scale,
  UserCog,
  FileCheck
} from "lucide-react";

const steps = [
  { id: "purpose", label: "System Purpose", icon: Target },
  { id: "users", label: "Users & Interaction", icon: Users },
  { id: "data", label: "Data & Privacy", icon: Database },
  { id: "tools", label: "Tools & Models", icon: Wrench },
  { id: "decisions", label: "Decisions & Risk", icon: Scale },
  { id: "oversight", label: "Human Oversight", icon: UserCog },
  { id: "review", label: "Review & Generate", icon: FileCheck },
];

interface FormData {
  [key: string]: string | boolean | string[];
}

interface IntakeClientProps {
  clientId: string;
  projectId: string;
}

export default function IntakeClient({ clientId, projectId }: IntakeClientProps) {
  const router = useRouter();
  const { 
    isAuthenticated, 
    currentUser,
    clients,
    saveIntakeAnswer,
    getIntakeAnswersByProject,
    getProjectById,
    updateProject
  } = useStore();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [isGenerating, setIsGenerating] = useState(false);

  const project = getProjectById(projectId);
  const client = clients.find(c => c.id === clientId);
  const existingAnswers = getIntakeAnswersByProject(projectId);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const loaded: FormData = {};
    existingAnswers.forEach(answer => {
      loaded[answer.questionKey] = answer.answer;
    });
    setFormData(loaded);
  }, [existingAnswers]);

  if (!isAuthenticated || !project) {
    return null;
  }

  const handleInputChange = (key: string, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const saveCurrentStep = () => {
    const currentQuestions = getQuestionsForStep(currentStep);
    currentQuestions.forEach(q => {
      if (formData[q.key] !== undefined) {
        saveIntakeAnswer({
          projectId: projectId,
          section: steps[currentStep].id,
          questionKey: q.key,
          answer: formData[q.key]
        });
      }
    });
  };

  const handleNext = () => {
    saveCurrentStep();
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStepClick = (index: number) => {
    if (index <= currentStep || index === 0) {
      saveCurrentStep();
      setCurrentStep(index);
    }
  };

  const calculateTrustScore = (): number => {
    let score = 0;
    const totalQuestions = steps.slice(0, -1).reduce((acc, step) => 
      acc + getQuestionsForStep(steps.indexOf(step)).length, 0
    );
    const answered = Object.keys(formData).length;
    score = Math.round((answered / totalQuestions) * 100);
    return Math.min(score, 100);
  };

  const getRiskLevel = (): "green" | "yellow" | "red" => {
    const score = calculateTrustScore();
    if (score >= 80) return "green";
    if (score >= 50) return "yellow";
    return "red";
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    saveCurrentStep();
    
    updateProject(projectId, {
      status: "trust-ready",
      trustScore: calculateTrustScore(),
      riskLevel: getRiskLevel(),
      completionPercentage: 100
    });

    await new Promise(resolve => setTimeout(resolve, 1500));
    
    router.push(`/clients/${clientId}/projects/${projectId}/passport`);
  };

  const getQuestionsForStep = (stepIndex: number): Array<{
    key: string;
    question: string;
    type: "text" | "textarea" | "boolean" | "select" | "multiselect";
    options?: string[];
    required: boolean;
  }> => {
    switch (stepIndex) {
      case 0:
        return [
          { key: "systemName", question: "What is the system called?", type: "text", required: true },
          { key: "mainPurpose", question: "What is its main purpose?", type: "textarea", required: true },
          { key: "customerFacing", question: "Is it customer-facing or internal?", type: "select", options: ["customer-facing", "internal"], required: true },
          { key: "businessOutcome", question: "What business outcome does it support?", type: "textarea", required: true },
        ];
      case 1:
        return [
          { key: "humanInteraction", question: "Do humans interact directly with the system?", type: "boolean", required: true },
          { key: "aiAwareness", question: "Are users aware they are interacting with AI?", type: "boolean", required: true },
          { key: "generatesContent", question: "Does the system generate content, recommendations, or decisions?", type: "select", options: ["content", "recommendations", "decisions", "none"], required: true },
          { key: "businessArea", question: "In which business area is it used?", type: "select", options: ["customer-service", "sales", "hr", "legal", "finance", "operations", "other"], required: true },
        ];
      case 2:
        return [
          { key: "personalData", question: "Does it process personal data?", type: "boolean", required: true },
          { key: "sensitiveData", question: "Sensitive categories?", type: "multiselect", options: ["none", "health", "biometric", "financial", "criminal", "political", "religious"], required: false },
          { key: "affectedGroups", question: "Which user groups are affected?", type: "multiselect", options: ["employees", "customers", "candidates", "patients", "children", "vulnerable"], required: true },
          { key: "dataTypes", question: "What types of data enter the system?", type: "multiselect", options: ["text", "voice", "images", "documents", "structured-data", "biometric"], required: true },
          { key: "dataRetention", question: "Is data retained anywhere?", type: "boolean", required: true },
        ];
      case 3:
        return [
          { key: "llmProvider", question: "Which LLM provider is used?", type: "select", options: ["openai", "anthropic", "google", "azure", "local", "other"], required: true },
          { key: "voiceProvider", question: "Which voice provider is used (if any)?", type: "select", options: ["none", "retell", "vapi", "bland", "twilio", "other"], required: false },
          { key: "automationTools", question: "Which automation tools are connected?", type: "multiselect", options: ["n8n", "zapier", "make", "none"], required: false },
          { key: "connectedSystems", question: "Which CRM/helpdesk/databases are connected?", type: "multiselect", options: ["salesforce", "hubspot", "zendesk", "postgres", "mongodb", "none"], required: false },
        ];
      case 4:
        return [
          { key: "makesDecisions", question: "Does the system rank, score, filter, recommend, or decide?", type: "multiselect", options: ["rank", "score", "filter", "recommend", "decide", "none"], required: true },
          { key: "impactAreas", question: "Could outputs affect employment, health, finance, access, support quality?", type: "multiselect", options: ["employment", "health", "finance", "access", "support", "none"], required: true },
          { key: "materialHarm", question: "Could errors create material harm?", type: "boolean", required: true },
          { key: "humanReview", question: "Is human review mandatory before high-impact action?", type: "boolean", required: true },
        ];
      case 5:
        return [
          { key: "systemOwner", question: "Who owns the system?", type: "text", required: true },
          { key: "canIntervene", question: "Who can intervene?", type: "text", required: true },
          { key: "escalationTrigger", question: "When must escalation happen?", type: "textarea", required: true },
          { key: "fallbackPlan", question: "What is the fallback if AI fails?", type: "textarea", required: true },
        ];
      default:
        return [];
    }
  };

  const CurrentStepIcon = steps[currentStep].icon;

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href={`/clients/${clientId}`}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </Link>
            <div className="h-6 w-px bg-white/10" />
            <div>
              <h1 className="text-white font-medium">{project.name}</h1>
              <p className="text-xs text-slate-400">Intake Assessment</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-white">{currentUser?.name}</p>
              <p className="text-xs text-slate-400">{client?.name}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const isClickable = index <= currentStep;
            
            return (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => isClickable && handleStepClick(index)}
                  className={`flex flex-col items-center gap-2 transition-all ${
                    isClickable ? "cursor-pointer" : "cursor-not-allowed"
                  }`}
                  disabled={!isClickable}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    isActive 
                      ? "bg-blue-500 text-white" 
                      : isCompleted
                        ? "bg-emerald-500 text-white"
                        : "bg-white/5 text-slate-500"
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={`text-xs ${
                    isActive ? "text-white" : "text-slate-500"
                  }`}>
                    {step.label}
                  </span>
                </button>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    isCompleted ? "bg-emerald-500" : "bg-white/10"
                  }`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto">
          {currentStep < 6 ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <CurrentStepIcon className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {steps[currentStep].label}
                  </h2>
                  <p className="text-slate-400">
                    Step {currentStep + 1} of 6
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {getQuestionsForStep(currentStep).map((q) => (
                  <div key={q.key}>
                    <label className="block text-sm font-medium text-white mb-2">
                      {q.question}
                      {q.required && <span className="text-red-400 ml-1">*</span>}
                    </label>
                    
                    {q.type === "text" && (
                      <input
                        type="text"
                        value={(formData[q.key] as string) || ""}
                        onChange={(e) => handleInputChange(q.key, e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        placeholder="Enter your answer..."
                      />
                    )}
                    
                    {q.type === "textarea" && (
                      <textarea
                        value={(formData[q.key] as string) || ""}
                        onChange={(e) => handleInputChange(q.key, e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                        placeholder="Enter your answer..."
                      />
                    )}
                    
                    {q.type === "boolean" && (
                      <div className="flex gap-4">
                        {["Yes", "No"].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleInputChange(q.key, opt === "Yes")}
                            className={`px-6 py-3 rounded-xl font-medium transition-all ${
                              formData[q.key] === (opt === "Yes")
                                ? "bg-blue-500 text-white"
                                : "bg-white/5 text-slate-400 hover:bg-white/10"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {q.type === "select" && q.options && (
                      <select
                        value={(formData[q.key] as string) || ""}
                        onChange={(e) => handleInputChange(q.key, e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-slate-900">Select...</option>
                        {q.options.map((opt) => (
                          <option key={opt} value={opt} className="bg-slate-900 capitalize">
                            {opt.replace(/-/g, " ")}
                          </option>
                        ))}
                      </select>
                    )}
                    
                    {q.type === "multiselect" && q.options && (
                      <div className="flex flex-wrap gap-2">
                        {q.options.map((opt) => {
                          const selected = ((formData[q.key] as string[]) || []).includes(opt);
                          return (
                            <button
                              key={opt}
                              onClick={() => {
                                const current = (formData[q.key] as string[]) || [];
                                const updated = selected
                                  ? current.filter((v) => v !== opt)
                                  : [...current, opt];
                                handleInputChange(q.key, updated);
                              }}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                selected
                                  ? "bg-blue-500 text-white"
                                  : "bg-white/5 text-slate-400 hover:bg-white/10"
                              }`}
                            >
                              {opt.replace(/-/g, " ")}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                  <FileCheck className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Review & Generate
                  </h2>
                  <p className="text-slate-400">
                    Review your answers and generate Trust Passport
                  </p>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-400">Trust Score</span>
                  <span className={`text-2xl font-bold ${
                    calculateTrustScore() >= 80 ? "text-emerald-400" :
                    calculateTrustScore() >= 50 ? "text-amber-400" : "text-red-400"
                  }`}>
                    {calculateTrustScore()}%
                  </span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      calculateTrustScore() >= 80 ? "bg-emerald-500" :
                      calculateTrustScore() >= 50 ? "bg-amber-500" : "bg-red-500"
                    }`}
                    style={{ width: `${calculateTrustScore()}%` }}
                  />
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Risk Level</span>
                  <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    getRiskLevel() === "green" ? "bg-emerald-500/20 text-emerald-400" :
                    getRiskLevel() === "yellow" ? "bg-amber-500/20 text-amber-400" :
                    "bg-red-500/20 text-red-400"
                  }`}>
                    {getRiskLevel() === "green" ? "Low Risk" :
                     getRiskLevel() === "yellow" ? "Medium Risk" : "High Risk"}
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="text-white font-medium">Summary</h3>
                {steps.slice(0, -1).map((step, idx) => (
                  <div key={step.id} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-slate-300">{step.label}</span>
                    <span className="text-slate-500 text-sm ml-auto">
                      {getQuestionsForStep(idx).filter(q => formData[q.key] !== undefined).length} / {getQuestionsForStep(idx).length} answered
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-violet-600 text-white rounded-xl font-semibold text-lg hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating Trust Passport...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    Generate Trust Passport
                  </>
                )}
              </button>
            </div>
          )}

          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-6 py-3 text-slate-400 hover:text-white transition-colors disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
            
            {currentStep < 6 && (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl font-medium hover:bg-slate-200 transition-colors"
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
