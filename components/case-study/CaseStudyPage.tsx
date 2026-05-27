import CaseLayout, { CaseStudyData } from "./CaseLayout";
import {
  LegacyFragmentationArtifact,
  CostModelArtifact,
  UnifiedWorkspaceArtifact,
  ScaleReasoningArtifact,
} from "./SupportHubArtifacts";
import {
  StakeholderAlignmentArtifact,
  WorkshopMethodArtifact,
  ApprovalFlowArtifact,
  KeyboardNavArtifact,
} from "./QuotaArtifacts";
import {
  ResearchMethodologyArtifact,
  HeuristicMatrixArtifact,
  FlowCompressionArtifact,
} from "./SalesArtifacts";

// Artifact maps — keyed by slug then section index
// These are the SVG artifacts that can't live in JSON
const ARTIFACTS: Record<string, CaseStudyData["artifacts"]> = {
  "predictive-support-hub": [
    { id: "legacy-fragmentation", title: "Legacy tool map (sample)", caption: "12 of the 32 tools an agent navigated per call. Red: accessed on every call. Gray: situational.", component: <LegacyFragmentationArtifact /> },
    { id: "into-field-null", title: "", caption: "", component: null },
    { id: "cost-model", title: "Infrastructure cost model", caption: "The argument that reframed the project. Fragmentation cost modelled as AHT delta × call volume × 3,000 agents × cost per agent-hour.", component: <CostModelArtifact /> },
    { id: "workspace-layers", title: "Unified workspace: three intelligence layers", caption: "Auto-identification, contextual scripting, live resolution. Each layer replaces a category of legacy tools.", component: <UnifiedWorkspaceArtifact /> },
    { id: "workspace-null", title: "", caption: "", component: null },
    { id: "scale-reasoning", title: "Scale reasoning: 3,000 agents to 10M users", caption: "Same discipline, different arithmetic. Each dimension maps from the agent context to the consumer context.", component: <ScaleReasoningArtifact /> },
  ],
  "b2b-sales-rescue": [
    { id: "research-methodology", title: "Research methodology breakdown", caption: "37 interviews, 25 usability tests, 20 shadow sessions. The key finding (agents pre-filling quotes offline) only surfaced through observation.", component: <ResearchMethodologyArtifact /> },
    { id: "heuristic-matrix", title: "Criticality vs effort prioritisation matrix", caption: "Every finding scored on Nielsen severity and implementation effort. The matrix output was a roadmap, not a to-do list.", component: <HeuristicMatrixArtifact /> },
    { id: "flow-compression", title: "7 tools to 3-step flow compression", caption: "Before: 7 separate tools, ~60 min. After: 3 steps, single interface, ~15 min.", component: <FlowCompressionArtifact /> },
  ],
  "quota-management": [
    { id: "starting-null", title: "", caption: "", component: null },
    { id: "workshop-method", title: "Workshop-to-output method", caption: "Preliminary concept sketches brought into sessions as thinking tools. Each cycle produced locked decisions and flagged dependencies.", component: <WorkshopMethodArtifact /> },
    { id: "stakeholder-alignment", title: "Cross-functional alignment map", caption: "Six stakeholder groups, two sides. Design was the only function present in every session.", component: <StakeholderAlignmentArtifact /> },
    { id: "edge-cases-null", title: "", caption: "", component: null },
    { id: "keyboard-nav", title: "Keyboard interaction model", caption: "Full keyboard spec across list view, approval workflow, and create flow. Focus states use 2px solid #C42B2B at 2px offset, never suppressed.", component: <KeyboardNavArtifact /> },
    { id: "approval-flow", title: "Change request approval flow", caption: "Three request types routing to three approval structures. Configurable per client sign-off hierarchy.", component: <ApprovalFlowArtifact /> },
  ],
};

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  slug: string;
}

export default function CaseStudyPage({ data, slug }: Props) {
  const caseData: CaseStudyData = {
    index: data.index,
    title: data.title,
    tagline: data.tagline,
    role: data.role,
    location: data.location,
    year: data.year,
    roleDetail: data.roleDetail,
    impactSummary: data.impactSummary || undefined,
    context: data.context,
    metrics: data.metrics,
    sections: data.sections.map((s: {
      title: string;
      pullquote?: string;
      body: string[];
      screens?: { src: string; caption: string }[];
      narrowScreens?: boolean;
    }) => ({
      title: s.title,
      pullquote: s.pullquote || undefined,
      body: s.body,
      screens: s.screens?.length ? s.screens : undefined,
      narrowScreens: slug === "vocabulary",
    })),
    artifacts: ARTIFACTS[slug] ?? [],
    hideNda: slug === "vocabulary",
    wideHero: slug === "vocabulary",
  };

  return <CaseLayout data={caseData} />;
}
