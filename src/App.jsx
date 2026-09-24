import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, TerminalSquare, Search, FileText, Activity, Send,
  AlertTriangle, CheckCircle2, XCircle, Database, Globe,
  Fingerprint, Inbox, Mail, User, ChevronRight, BarChart3,
  MousePointerClick, Eye, ArrowLeft, Download, ExternalLink,
  AlertCircle, Zap
} from 'lucide-react';

const SCENARIOS = [
  { 
    id: 's1', 
    name: 'Microsoft 365 Password Expiry', 
    difficulty: 'Medium', 
    type: 'Credential Harvest',
    sender: 'security@micros0ft-support.com',
    senderName: 'Microsoft Security',
    subject: 'Action Required: Password Expiry Notice',
    body: `Dear User,\n\nYour Microsoft 365 password is set to expire in 2 hours. To maintain access to your email and corporate applications, you must keep your current password or choose a new one immediately.\n\nFailure to act will result in a temporary lock on your account.`,
    buttonText: 'Keep Current Password',
    isAttachment: false
  },
  { 
    id: 's2', 
    name: 'HR: Updated Leave Policy (PDF)', 
    difficulty: 'Hard', 
    type: 'Malware Attachment',
    sender: 'hr-dept@company-internal-portal.com',
    senderName: 'Human Resources',
    subject: 'UPDATED: Q3 Leave & Remote Work Policy',
    body: `Hello Team,\n\nPlease find attached the updated remote work and leave policy for Q3. There are significant changes to PTO accrual and mandatory office days that require your immediate review and signature.\n\nPlease download and sign the document by EOD Friday.`,
    buttonText: 'Q3_Policy_Update.pdf',
    isAttachment: true
  },
  { 
    id: 's3', 
    name: 'IT Support: Required VPN Update', 
    difficulty: 'Easy', 
    type: 'Link Click',
    sender: 'it-helpdesk@service-desk-ticket.com',
    senderName: 'IT Helpdesk',
    subject: 'CRITICAL: VPN Client Update Required',
    body: `Attention,\n\nA critical security vulnerability has been identified in our current VPN client. You are required to download and install the security patch immediately to continue working remotely.\n\nClick the link below to initiate the patch installation.`,
    buttonText: 'Install VPN Patch v2.4.1',
    isAttachment: false
  },
];

const MOCK_BREACHES = [
  { name: 'LinkedIn', date: '2012-05-01', compromised: ['Passwords', 'Emails'], description: 'In 2012, LinkedIn suffered a massive data breach exposing millions of passwords.' },
  { name: 'Canva', date: '2019-05-24', compromised: ['Emails', 'Locations', 'Passwords', 'Names'], description: 'Canva was breached exposing 137 million users data including bcrypt hashes.' },
  { name: 'Adobe', date: '2013-10-01', compromised: ['Emails', 'Password Hints', 'Passwords'], description: 'Adobe faced a breach exposing 153 million user accounts.' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('simulator');

  return (
    <div className="flex h-screen w-full bg-[#090b10] text-[#c9d1d9] font-sans overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-gradient-to-br from-[#090b10] to-[#0d1117]">
          <div className="max-w-6xl mx-auto h-full">
            {activeTab === 'simulator' && <CampaignSimulator />}
            {activeTab === 'osint' && <OsintBreachCheck />}
            {activeTab === 'analyzer' && <ContentAnalyzer />}
          </div>
        </main>
      </div>
    </div>
  );
}

function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'simulator', label: 'Campaign Simulator', icon: Send },
    { id: 'osint', label: 'Breach Check (OSINT)', icon: Database },
    { id: 'analyzer', label: 'Content Analyzer', icon: FileText },
  ];

  return (
    <aside className="w-64 bg-[#05070a] border-r border-[#1f2937] flex flex-col shadow-2xl z-20 hidden md:flex">
      <div className="h-16 flex items-center px-6 border-b border-[#1f2937] bg-[#090b10]">
        <Shield className="w-6 h-6 text-blue-500 mr-3" />
        <h1 className="font-bold tracking-wider text-sm uppercase text-white">
          PhishAware <span className="text-blue-500">SOC</span>
        </h1>
      </div>
      <nav className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
                  : 'text-slate-400 hover:bg-[#161b22] hover:text-slate-200 border border-transparent'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="p-4 mx-4 mb-6 rounded-lg bg-[#0d1117] border border-[#1f2937]">
        <div className="flex items-center gap-2 mb-2 text-blue-400">
          <TerminalSquare className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Node Status</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
          All Systems Operational
        </div>
      </div>
    </aside>
  );
}

function TopBar() {
  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-[#1f2937] bg-[#05070a] z-10 shadow-sm shrink-0">
      <div className="flex items-center gap-2">
        <Activity className="w-5 h-5 text-slate-400" />
        <h2 className="text-sm font-semibold text-slate-300 tracking-wide hidden sm:block">Threat Operations Center</h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="px-3 py-1.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-medium flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Authorized Environments Only</span>
        </div>
      </div>
    </header>
  );
}

function CampaignSimulator() {
  // States: 'config', 'deploying', 'inbox', 'metrics'
  const [viewState, setViewState] = useState('config'); 
  const [email, setEmail] = useState('');
  const [scenarioId, setScenarioId] = useState(SCENARIOS[0].id);
  
  const [deployProgress, setDeployProgress] = useState(0);
  const [deployStepText, setDeployStepText] = useState('');
  
  const [metrics, setMetrics] = useState({ opened: false, clicked: false });

  const activeScenario = SCENARIOS.find(s => s.id === scenarioId);

  const handleLaunch = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setViewState('deploying');
    setDeployProgress(10);
    setDeployStepText('Compiling Payload...');

    setTimeout(() => { setDeployProgress(40); setDeployStepText('Spoofing Headers...'); }, 1200);
    setTimeout(() => { setDeployProgress(75); setDeployStepText('Bypassing Filters...'); }, 2500);
    setTimeout(() => { setDeployProgress(100); setDeployStepText('Delivered successfully.'); }, 3800);
    setTimeout(() => { setViewState('inbox'); setMetrics({ opened: true, clicked: false }); }, 4500);
  };

  const handleLinkClick = () => {
    setMetrics(prev => ({ ...prev, clicked: true }));
    alert("Simulation Alert: In a real scenario, this would harvest credentials or download malware. User interaction tracked.");
  };

  return (
    <div className="h-full flex flex-col relative">
      
      {/* Config View */}
      {viewState === 'config' && (
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full animate-in fade-in zoom-in-95 duration-300">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <Send className="w-6 h-6 text-blue-500" /> Campaign Simulator
            </h2>
            <p className="text-slate-400 text-sm">Deploy controlled, synthetic phishing campaigns to evaluate personnel awareness.</p>
          </div>

          <div className="bg-[#0d1117] border border-[#1f2937] rounded-xl flex flex-col shadow-lg overflow-hidden flex-1">
            <div className="px-6 py-4 border-b border-[#1f2937] bg-[#161b22]">
              <h3 className="font-semibold text-slate-200 text-sm">Deployment Configuration</h3>
            </div>
            <form onSubmit={handleLaunch} className="p-6 flex-1 flex flex-col gap-6 overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Target Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input 
                    type="email" 
                    required
                    placeholder="employee@yourcompany.com"
                    className="w-full bg-[#05070a] border border-[#1f2937] rounded-md py-3 pl-10 pr-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">Select Attack Scenario</label>
                <div className="grid gap-3">
                  {SCENARIOS.map((scen) => (
                    <label 
                      key={scen.id}
                      className={`block cursor-pointer p-4 border rounded-lg transition-all relative overflow-hidden group ${
                        scenarioId === scen.id 
                          ? 'border-blue-500 bg-blue-500/10' 
                          : 'border-[#1f2937] bg-[#05070a] hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <input 
                          type="radio" 
                          name="scenario" 
                          value={scen.id}
                          checked={scenarioId === scen.id}
                          onChange={(e) => setScenarioId(e.target.value)}
                          className="w-4 h-4 text-blue-600 bg-slate-900 border-slate-700 rounded focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-bold text-slate-200 mb-1">{scen.name}</p>
                          <div className="flex items-center gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1"><Fingerprint className="w-3 h-3"/> {scen.type}</span>
                            <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold ${
                              scen.difficulty === 'Hard' ? 'bg-red-500/20 text-red-400' :
                              scen.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-green-500/20 text-green-400'
                            }`}>{scen.difficulty}</span>
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-6">
                <button 
                  type="submit" 
                  disabled={!email}
                  className="w-full py-3.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] disabled:opacity-50 disabled:shadow-none"
                >
                  <Zap className="w-5 h-5" /> Launch Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Deploying Overlay Modal */}
      {viewState === 'deploying' && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#090b10]/90 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-8 max-w-md w-full shadow-2xl flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full border-4 border-[#30363d] border-t-blue-500 animate-spin mb-6"></div>
            <h3 className="text-xl font-bold text-white mb-2">Deploying Simulation</h3>
            <p className="text-slate-400 text-sm mb-8 font-mono h-6">{deployStepText}</p>
            
            <div className="w-full bg-[#05070a] rounded-full h-2.5 border border-[#30363d] overflow-hidden">
              <div 
                className="bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${deployProgress}%` }}
              ></div>
            </div>
            <div className="mt-4 w-full flex justify-between text-xs text-slate-500 font-mono">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      )}

      {/* Target Virtual Inbox View */}
      {viewState === 'inbox' && (
        <div className="flex-1 bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col text-slate-800 animate-in slide-in-from-bottom-8 duration-500">
          {/* Mock Browser Header */}
          <div className="bg-slate-200 px-4 py-2 flex items-center gap-2 border-b border-slate-300 select-none">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
            </div>
            <div className="ml-4 bg-white/60 px-3 py-1 rounded text-xs text-slate-500 flex-1 flex items-center gap-2 border border-slate-300 shadow-inner">
              <Globe className="w-3 h-3" /> webmail.corporate-login.com/mail/inbox
            </div>
            <button 
              onClick={() => setViewState('metrics')}
              className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs font-bold shadow flex items-center gap-1 transition-colors"
            >
              <BarChart3 className="w-3.5 h-3.5" /> Return to SOC (Metrics)
            </button>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Inbox Sidebar */}
            <div className="w-48 bg-slate-50 border-r border-slate-200 p-3 hidden sm:flex flex-col gap-1 select-none">
              <div className="bg-blue-100 text-blue-700 font-semibold px-3 py-2 rounded-md flex items-center justify-between text-sm">
                <span className="flex items-center gap-2"><Inbox className="w-4 h-4"/> Inbox</span>
                <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">1</span>
              </div>
              <div className="text-slate-600 hover:bg-slate-200 cursor-pointer px-3 py-2 rounded-md flex items-center gap-2 text-sm transition-colors">
                <Send className="w-4 h-4"/> Sent
              </div>
              <div className="text-slate-600 hover:bg-slate-200 cursor-pointer px-3 py-2 rounded-md flex items-center gap-2 text-sm transition-colors mt-auto">
                <User className="w-4 h-4"/> {email.split('@')[0]}
              </div>
            </div>

            {/* Email Content Area */}
            <div className="flex-1 flex flex-col bg-white overflow-y-auto">
              <div className="p-6 max-w-3xl border-b border-slate-100">
                <h1 className="text-2xl font-normal mb-6 text-slate-800">{activeScenario.subject}</h1>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-lg">
                      {activeScenario.senderName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-900">{activeScenario.senderName}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        &lt;{activeScenario.sender}&gt; 
                        <AlertCircle className="w-3 h-3 text-red-500 inline ml-1" title="External Sender" />
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
              </div>

              <div className="p-6 max-w-3xl text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                {activeScenario.body}
                
                <div className="mt-8">
                  {activeScenario.isAttachment ? (
                    <div 
                      onClick={handleLinkClick}
                      className="inline-flex items-center gap-3 p-3 border border-slate-300 rounded-md bg-slate-50 hover:bg-blue-50 cursor-pointer transition-colors group"
                    >
                      <div className="bg-red-500 p-2 rounded text-white">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm group-hover:text-blue-600">{activeScenario.buttonText}</p>
                        <p className="text-xs text-slate-500">142 KB</p>
                      </div>
                      <Download className="w-4 h-4 text-slate-400 ml-4 group-hover:text-blue-500" />
                    </div>
                  ) : (
                    <button 
                      onClick={handleLinkClick}
                      className="bg-[#0078D4] hover:bg-[#106EBE] text-white px-6 py-2.5 rounded-sm font-semibold flex items-center gap-2 transition-colors shadow-sm"
                    >
                      {activeScenario.buttonText} <ExternalLink className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <div className="mt-12 pt-4 border-t border-slate-200 text-xs text-slate-400">
                  <p>This email was sent to {email}. If you did not request this, please contact IT immediately.</p>
                  <p className="mt-1">© {new Date().getFullYear()} Corporate Systems</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Metrics Dashboard View */}
      {viewState === 'metrics' && (
        <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full animate-in fade-in duration-300">
          <button 
            onClick={() => setViewState('config')}
            className="self-start mb-6 text-slate-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> New Simulation
          </button>
          
          <h2 className="text-2xl font-bold text-white mb-6">Campaign After-Action Report</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#161b22] border border-[#1f2937] p-6 rounded-xl flex items-center gap-4 shadow-lg">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">Status</p>
                <p className="text-xl font-bold text-white">Delivered</p>
              </div>
            </div>
            
            <div className="bg-[#161b22] border border-[#1f2937] p-6 rounded-xl flex items-center gap-4 shadow-lg">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${metrics.opened ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-800 text-slate-500'}`}>
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">Email Opened</p>
                <p className={`text-xl font-bold ${metrics.opened ? 'text-amber-400' : 'text-slate-500'}`}>
                  {metrics.opened ? 'Yes' : 'No'}
                </p>
              </div>
            </div>

            <div className="bg-[#161b22] border border-[#1f2937] p-6 rounded-xl flex items-center gap-4 shadow-lg">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${metrics.clicked ? 'bg-red-500/10 text-red-500' : 'bg-slate-800 text-slate-500'}`}>
                <MousePointerClick className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">Payload Clicked</p>
                <p className={`text-xl font-bold ${metrics.clicked ? 'text-red-400' : 'text-emerald-400'}`}>
                  {metrics.clicked ? 'Compromised' : 'Safe'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#05070a] border border-[#1f2937] rounded-xl p-6 shadow-lg">
            <h3 className="font-semibold text-slate-200 mb-4 border-b border-[#1f2937] pb-2">Target Profile & Assessment</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500 mb-1">Target Address</p>
                <p className="text-white font-mono">{email}</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">Scenario Used</p>
                <p className="text-white">{activeScenario.name}</p>
              </div>
              <div className="col-span-2 mt-4">
                <p className="text-slate-500 mb-1">Remediation Recommendation</p>
                <p className="text-slate-300 bg-blue-500/10 border border-blue-500/20 p-3 rounded">
                  {metrics.clicked 
                    ? 'User interacted with malicious payload. Immediate enrollment in Security Awareness Training (Module: Recognizing Phishing Indicators) required.' 
                    : 'User opened email but did not interact with payload. Continue standard periodic testing.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function OsintBreachCheck() {
  const [email, setEmail] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSearching(true);
    setHasSearched(true);
    setResults(null);

    setTimeout(() => {
      if (email.includes('safe') || email.length > 25) {
        setResults([]);
      } else {
        const numBreaches = Math.floor(Math.random() * 3) + 1;
        const shuffled = [...MOCK_BREACHES].sort(() => 0.5 - Math.random());
        setResults(shuffled.slice(0, numBreaches));
      }
      setIsSearching(false);
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="text-center mb-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
          <Database className="w-8 h-8 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">OSINT Breach Intelligence</h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Query dark web records and public breaches to determine if an identity has been compromised.
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            type="email" 
            required
            disabled={isSearching}
            placeholder="Enter target email address (e.g., john.doe@example.com)"
            className="w-full bg-[#0d1117] border border-[#1f2937] rounded-lg py-4 pl-12 pr-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-inner"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button 
          type="submit"
          disabled={isSearching || !email}
          className="px-8 py-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all disabled:opacity-50 flex items-center gap-2"
        >
          {isSearching ? <Activity className="w-5 h-5 animate-spin" /> : 'Scan Intel'}
        </button>
      </form>

      <div className="flex-1 bg-[#0d1117] border border-[#1f2937] rounded-xl overflow-hidden flex flex-col">
        {!hasSearched ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500 p-8">
            <Globe className="w-12 h-12 mb-4 opacity-20" />
            <p>Awaiting query input.</p>
          </div>
        ) : isSearching ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
            <p className="text-indigo-400 font-mono text-sm animate-pulse">Querying relational databases...</p>
          </div>
        ) : results?.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-emerald-500/5">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4 rounded-full" />
            <h3 className="text-xl font-bold text-emerald-400 mb-2">No Breaches Found</h3>
            <p className="text-slate-400 text-center">This email address does not appear in known public breaches.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 mb-6">
              <XCircle className="w-6 h-6 flex-shrink-0" />
              <div>
                <h4 className="font-bold">Compromise Detected</h4>
                <p className="text-sm text-red-400/80">Found in {results.length} known data breaches.</p>
              </div>
            </div>
            
            {results.map((breach, i) => (
              <div key={i} className="bg-[#161b22] border border-[#1f2937] rounded-lg p-5">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-lg font-bold text-slate-200">{breach.name}</h4>
                  <span className="text-xs font-mono bg-[#05070a] border border-[#1f2937] px-2 py-1 rounded text-slate-400">
                    {breach.date}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mb-4">{breach.description}</p>
                <div className="flex flex-wrap gap-2">
                  {breach.compromised.map((item, j) => (
                    <span key={j} className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ContentAnalyzer() {
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState(null);

  const analyzeText = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsAnalyzing(true);
    setReport(null);

    setTimeout(() => {
      const text = content.toLowerCase();
      const flags = [];
      let score = 0;

      if (text.match(/urgent|immediate|24 hours|suspended|action required/i)) {
        flags.push({ type: 'Urgency', desc: 'Language designed to force immediate action.', severity: 'high' });
        score += 35;
      }
      if (text.match(/password|login|credentials|ssn/i)) {
        flags.push({ type: 'Credential Request', desc: 'Direct request for sensitive data.', severity: 'critical' });
        score += 45;
      }
      if (text.match(/http:\/\/[^\s]+|https:\/\/[^\s]+/i)) {
        flags.push({ type: 'Embedded URLs', desc: 'Contains hyperlinks requiring verification.', severity: 'medium' });
        score += 15;
      }

      score = Math.min(score, 99);
      if (flags.length === 0) score = Math.floor(Math.random() * 15);

      setReport({ score, flags });
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6">
      <div className="flex-1 flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <FileText className="w-6 h-6 text-purple-500" /> Content Analyzer
          </h2>
          <p className="text-slate-400 text-sm">Paste suspicious email bodies for heuristic threat analysis.</p>
        </div>
        
        <form onSubmit={analyzeText} className="flex-1 flex flex-col gap-4">
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isAnalyzing}
            placeholder="Paste email headers or body content here..."
            className="flex-1 bg-[#0d1117] border border-[#1f2937] rounded-xl p-5 text-sm text-slate-300 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none font-mono"
          />
          <button 
            type="submit"
            disabled={isAnalyzing || !content.trim()}
            className="py-3.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {isAnalyzing ? <Activity className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
          </button>
        </form>
      </div>

      <div className="flex-1 bg-[#05070a] border border-[#1f2937] rounded-xl overflow-hidden flex flex-col shadow-lg">
        <div className="px-5 py-4 border-b border-[#1f2937] bg-[#161b22]">
          <h3 className="font-semibold text-slate-200 text-sm">Intelligence Report</h3>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 flex flex-col relative">
          {!report && !isAnalyzing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600">
              <Fingerprint className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-sm">Awaiting content.</p>
            </div>
          )}

          {isAnalyzing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-purple-500 space-y-4">
               <div className="flex gap-1">
                 <div className="w-2 h-8 bg-purple-500 animate-pulse delay-75"></div>
                 <div className="w-2 h-12 bg-purple-400 animate-pulse delay-150"></div>
                 <div className="w-2 h-6 bg-purple-600 animate-pulse delay-300"></div>
                 <div className="w-2 h-10 bg-purple-400 animate-pulse delay-200"></div>
               </div>
               <p className="text-sm font-mono animate-pulse">Running NLP Scanners...</p>
            </div>
          )}

          {report && (
            <div className="space-y-6 animate-in fade-in zoom-in duration-300">
              <div className="flex items-center justify-center">
                <div className="relative flex items-center justify-center w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-[#1f2937]"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={report.score > 70 ? 'text-red-500' : report.score > 30 ? 'text-amber-500' : 'text-emerald-500'}
                      strokeDasharray={`${report.score}, 100`}
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-3xl font-bold text-white">{report.score}%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-300 border-b border-[#1f2937] pb-2">Indicators</h4>
                {report.flags.length === 0 ? (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5" />
                    No malicious patterns detected.
                  </div>
                ) : (
                  report.flags.map((flag, idx) => (
                    <div key={idx} className="p-4 bg-[#0d1117] border border-[#1f2937] rounded-lg relative overflow-hidden">
                      <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                        flag.severity === 'critical' ? 'bg-red-600' : 
                        flag.severity === 'high' ? 'bg-red-400' : 'bg-amber-400'
                      }`}></div>
                      <div className="ml-2">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-semibold text-slate-200 text-sm">{flag.type}</span>
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm ${
                            flag.severity === 'critical' ? 'bg-red-500/20 text-red-400' : 
                            flag.severity === 'high' ? 'bg-red-400/20 text-red-300' : 'bg-amber-400/20 text-amber-400'
                          }`}>
                            {flag.severity}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">{flag.desc}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
