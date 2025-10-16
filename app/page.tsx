'use client';

import { useEffect, useState } from 'react';

function SectionTitle({ kicker, title, subtitle }: { kicker?: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-4xl text-center animate-fade-in">
      {kicker && (
        <p className="mb-4 text-xl font-semibold uppercase tracking-widest text-emerald-600 animate-slide-down">
          {kicker}
        </p>
      )}
      <h2 className="text-4xl font-bold leading-tight tracking-[-0.02em] md:text-6xl lg:text-7xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700 bg-clip-text text-transparent animate-slide-up">
        {title}
      </h2>
      {subtitle && <p className="mt-6 text-lg text-zinc-600 md:text-xl lg:text-2xl leading-relaxed animate-fade-in">{subtitle}</p>}
    </div>
  );
}

function Check({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
      <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function Sparkles({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M9.5 2L11.5 7.5L17 9.5L11.5 11.5L9.5 17L7.5 11.5L2 9.5L7.5 7.5L9.5 2Z" />
      <path d="M18 4L19 7L22 8L19 9L18 12L17 9L14 8L17 7L18 4Z" />
    </svg>
  );
}

function FormMessage({ message }: { message: {type: 'success' | 'error', text: string} | null }) {
  if (!message) return null;
  
  return (
    <div className={`mt-4 p-4 rounded-lg border ${
      message.type === 'success' 
        ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
        : 'bg-red-50 border-red-200 text-red-700'
    }`}>
      <div className="flex items-center gap-2">
        {message.type === 'success' ? (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
        <span className="text-sm font-medium">{message.text}</span>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formMessage, setFormMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const whatsapp = formData.get('telefone') as string;
    const perfil = formData.get('perfil') as string;
    const termos = formData.get('termos') as string;

    setFormMessage(null);
    if (!name || !name.trim()) {
      setFormMessage({type: 'error', text: 'Por favor, preencha seu nome completo.'});
      return;
    }
    
    if (!whatsapp || !whatsapp.trim()) {
      setFormMessage({type: 'error', text: 'Por favor, preencha seu WhatsApp.'});
      return;
    }
    
    if (!perfil || !perfil.trim()) {
      setFormMessage({type: 'error', text: 'Por favor, selecione seu perfil.'});
      return;
    }
    
    if (!termos) {
      setFormMessage({type: 'error', text: 'Por favor, marque o checkbox para concordar com o uso dos seus dados.'});
      return;
    }

    setFormMessage({type: 'success', text: 'Enviando dados...'});

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email || undefined,
          whatsapp: whatsapp,
          perfil: perfil,
          acceptedTerm: !!termos
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setFormMessage({type: 'success', text: result.message});
        form.reset();
      } else {
        setFormMessage({type: 'error', text: result.message});
      }
    } catch (error) {
      console.error('Erro ao enviar formulário - erro interno');
      setFormMessage({type: 'error', text: 'Erro ao enviar formulário. Tente novamente.'});
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden scroll-smooth bg-white text-zinc-900">
      {/* Header */}
      <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'border-b border-zinc-200/80 bg-white/95 shadow-sm backdrop-blur-xl' 
          : 'border-b border-transparent bg-white/60 backdrop-blur-md'
      }`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <a href="#" className="flex items-center gap-2 group">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-200 transition-all group-hover:shadow-xl group-hover:shadow-emerald-300 group-hover:scale-105">
              <span className="text-sm font-bold">H</span>
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-zinc-900 to-zinc-700 bg-clip-text text-transparent">Habita</span>
          </a>
          
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#como" className="text-zinc-700 transition-colors hover:text-emerald-600 relative group">
              Como funciona
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all group-hover:w-full"></span>
            </a>
            <a href="#recursos" className="text-zinc-700 transition-colors hover:text-emerald-600 relative group">
              Recursos
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all group-hover:w-full"></span>
            </a>
            <a href="#cobranca" className="text-zinc-700 transition-colors hover:text-emerald-600 relative group">
              Cobrança inteligente
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all group-hover:w-full"></span>
            </a>
            <a href="#comparativo" className="text-zinc-700 transition-colors hover:text-emerald-600 relative group">
              Comparativo
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all group-hover:w-full"></span>
            </a>
          </nav>
          
          <div className="flex items-center gap-3">
            <a
              href="#contato"
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition-all hover:shadow-xl hover:shadow-emerald-300 hover:scale-105"
            >
              <span className="relative z-10">Participar do piloto</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-400 opacity-0 transition-opacity group-hover:opacity-100"></div>
            </a>
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-200 bg-white/95 backdrop-blur-xl">
            <nav className="flex flex-col px-4 py-4 space-y-2">
              <a href="#como" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-zinc-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors">
                Como funciona
              </a>
              <a href="#recursos" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-zinc-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors">
                Recursos
              </a>
              <a href="#cobranca" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-zinc-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors">
                Cobrança inteligente
              </a>
              <a href="#comparativo" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-zinc-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors">
                Comparativo
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 md:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50/50 via-white to-white" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-20 lg:gap-16">
          <div className="animate-slide-right">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
              <Sparkles className="h-4 w-4 animate-spin-slow" />
              <span>Aluguel sem burocracia</span>
            </div>
            
            <h1 className="text-4xl font-bold leading-[1.1] tracking-[-0.03em] md:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-600 bg-clip-text text-transparent">
              Pagamentos, contratos e chat — tudo em um só lugar.
            </h1>
            
                        <p className="mt-4 text-lg text-zinc-600 leading-relaxed">
              Deixe seu contato e receba prioridade para testar o piloto.
            </p>
            
            <form className="mt-8 space-y-4 text-left" onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-700 mb-2">
                  Nome completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"
                  placeholder="Seu nome completo"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"
                  placeholder="seu@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-zinc-700 mb-2">
                  Telefone/WhatsApp
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  required
                  className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"
                  placeholder="(11) 99999-9999"
                />
              </div>
              
              <div>
                <label htmlFor="perfil" className="block text-sm font-medium text-zinc-700 mb-2">
                  Perfil
                </label>
                <select
                  id="perfil"
                  name="perfil"
                  required
                  className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"
                >
                  <option value="">Selecione seu perfil</option>
                  <option value="proprietario">Proprietário</option>
                  <option value="inquilino">Inquilino</option>
                  <option value="imobiliaria">Imobiliária</option>
                  <option value="corretor">Corretor</option>
                </select>
              </div>
              
              <div className="flex items-start space-x-3 pt-4">
                <input
                  type="checkbox"
                  id="termos"
                  name="termos"
                  required
                  className="mt-1 h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-200"
                />
                <label htmlFor="termos" className="text-sm text-zinc-600 leading-relaxed">
                  Ao enviar este formulário, você concorda em compartilhar seus dados conosco para usarmos apenas em comunicação sobre o piloto do Habita.
                </label>
              </div>
              
              <button
                type="submit"
                className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-4 text-white font-semibold shadow-lg shadow-emerald-200 transition-all hover:shadow-xl hover:shadow-emerald-300 hover:scale-105 mt-6"
              >
                <span className="relative z-10">Quero participar do piloto</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-400 opacity-0 transition-opacity group-hover:opacity-100"></div>
              </button>
              
              <FormMessage message={formMessage} />
            </form>
            
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a 
                href="#contato" 
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-200 transition-all hover:shadow-xl hover:shadow-emerald-300 hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Participar do piloto
                  <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-400 opacity-0 transition-opacity group-hover:opacity-100"></div>
              </a>
              
              <a 
                href="#como" 
                className="rounded-xl border-2 border-zinc-200 bg-white px-8 py-4 text-base font-semibold text-zinc-700 transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
              >
                Ver como funciona
              </a>
            </div>
            
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-zinc-600">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Check className="h-4 w-4" />
                </div>
                <span>Sem cartão agora</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Check className="h-4 w-4" />
                </div>
                <span>LGPD ready</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Check className="h-4 w-4" />
                </div>
                <span>Cancelar quando quiser</span>
              </div>
            </div>
          </div>
          
          <div className="relative animate-slide-left">
            <div className="mx-auto aspect-[4/3] w-full max-w-lg rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-2xl shadow-emerald-100/50 backdrop-blur transition-all hover:shadow-emerald-200/50 hover:scale-[1.02]">
              {/* Mock do dashboard */}
              <div className="mb-4 flex items-center justify-between">
                <div className="h-3 w-28 rounded-full bg-gradient-to-r from-emerald-200 to-emerald-100 animate-pulse" />
                <div className="h-3 w-16 rounded-full bg-gradient-to-r from-green-200 to-green-100 animate-pulse delay-300" />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-xl border border-zinc-100 bg-gradient-to-br from-white to-emerald-50/30 p-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                  <p className="text-xs text-zinc-500 font-medium">Recebidos</p>
                  <p className="mt-2 text-2xl font-bold text-emerald-600">R$ 4.250</p>
                  <div className="mt-1 text-xs text-emerald-600 flex items-center gap-1">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                    <span>+12%</span>
                  </div>
                </div>
                
                <div className="rounded-xl border border-zinc-100 bg-gradient-to-br from-white to-amber-50/30 p-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                  <p className="text-xs text-zinc-500 font-medium">Pendentes</p>
                  <p className="mt-2 text-2xl font-bold text-amber-600">R$ 1.280</p>
                  <div className="mt-1 text-xs text-zinc-400">3 contratos</div>
                </div>
                
                <div className="rounded-xl border border-zinc-100 bg-gradient-to-br from-white to-red-50/30 p-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                  <p className="text-xs text-zinc-500 font-medium">Atrasados</p>
                  <p className="mt-2 text-2xl font-bold text-red-600">2</p>
                  <div className="mt-1 text-xs text-red-600">Ação necessária</div>
                </div>
              </div>
              
              <div className="mt-6 h-40 rounded-xl border border-zinc-100 bg-gradient-to-tr from-emerald-50 via-green-50 to-white p-4 shadow-inner">
                <div className="flex items-end justify-between h-full gap-2">
                  {[65, 85, 75, 90, 80, 95, 88].map((height, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t opacity-80 hover:opacity-100 transition-all" style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-xl shadow-emerald-100/50 backdrop-blur md:block animate-float">
              <p className="text-xs text-zinc-500 font-medium">Próximo vencimento</p>
              <p className="mt-1 text-sm font-bold text-zinc-800">15 OUT · R$ 1.750</p>
              <div className="mt-2 flex items-center gap-1 text-xs text-emerald-600">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>Em 5 dias</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dores */}
      <section className="border-t border-zinc-100 py-20 md:py-28 bg-white" id="dores">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle
            kicker="problema"
            title="O aluguel ainda é complicado"
            subtitle="Burocracia, cobranças manuais e conversas perdidas no WhatsApp. Vamos simplificar."
          />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "📄", title: "Assinaturas, documentos e vistorias desconectadas", color: "from-blue-50 to-indigo-50" },
              { icon: "💸", title: "Pagamentos via Pix enviados manualmente todo mês", color: "from-amber-50 to-orange-50" },
              { icon: "📊", title: "Reajustes e vencimentos sem controle", color: "from-purple-50 to-pink-50" },
              { icon: "💬", title: "Comunicação confusa entre proprietário e inquilino", color: "from-emerald-50 to-green-50" },
            ].map((item, i) => (
              <div 
                key={item.title} 
                className="group rounded-2xl border border-zinc-200/80 bg-gradient-to-br from-white to-zinc-50 p-6 shadow-sm transition-all hover:shadow-xl hover:-translate-y-2 hover:border-emerald-200"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} shadow-sm transition-all group-hover:scale-110 group-hover:rotate-3`}>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <p className="font-semibold text-zinc-800 leading-snug">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-20 md:py-28 bg-zinc-50" id="como">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle
            kicker="passo a passo"
            title="3 passos simples para colocar sua locação no automático"
          />
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                n: "1",
                title: "Cadastre imóvel e contrato",
                desc: "Valor, vencimento, índice de reajuste e dados das partes.",
                icon: "🏠",
                color: "from-blue-600 to-blue-500"
              },
              {
                n: "2",
                title: "Convide o inquilino",
                desc: "Envie um link para assinar o contrato e acessar a plataforma. O inquilino visualiza pagamentos pendentes e paga via Pix.",
                icon: "✉️",
                color: "from-emerald-600 to-emerald-500"
              },
              {
                n: "3",
                title: "Acompanhe tudo no painel",
                desc: "Pagamentos, mensagens e manutenções ficam organizados em um só lugar.",
                icon: "📊",
                color: "from-purple-600 to-purple-500"
              },
            ].map((s, i) => (
              <div 
                key={s.n} 
                className="group relative rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-lg transition-all hover:shadow-2xl hover:-translate-y-3"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className={`absolute -top-4 left-8 rounded-2xl bg-gradient-to-r ${s.color} px-4 py-2 text-sm font-bold text-white shadow-lg`}>
                  Passo {s.n}
                </div>
                <div className="mt-4 mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-50 to-zinc-100 shadow-inner text-3xl transition-all group-hover:scale-110">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-zinc-800 mb-3">{s.title}</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">{s.desc}</p>
                
                {/* Connection line (except for last item) */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-zinc-300 to-transparent">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="border-t border-zinc-100 py-20 md:py-28 bg-white" id="recursos">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle kicker="recursos" title="Tudo o que você precisa para gerenciar a locação" />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Pagamentos automáticos",
                desc: "Pix gerado e cobrado automaticamente a cada mês, com confirmação instantânea.",
                icon: "💳",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                title: "Contratos digitais",
                desc: "Assinatura online com validade jurídica (Clicksign/ZapSign).",
                icon: "📝",
                gradient: "from-blue-500 to-indigo-500"
              },
              {
                title: "Chat proprietário ↔ inquilino",
                desc: "Converse sem sair do painel, com envio de fotos e documentos.",
                icon: "💬",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                title: "Reajustes e vencimentos",
                desc: "Cálculo e notificações automáticas por IPCA/IGP-M e lembretes de vencimento.",
                icon: "📈",
                gradient: "from-amber-500 to-orange-500"
              },
              {
                title: "Chamados de manutenção",
                desc: "Abra, aprove e acompanhe reparos com histórico e anexos.",
                icon: "🔧",
                gradient: "from-red-500 to-rose-500"
              },
              {
                title: "Relatórios e histórico",
                desc: "Visualize recebimentos, atrasos e contratos ativos em um só lugar.",
                icon: "📊",
                gradient: "from-cyan-500 to-blue-500"
              },
            ].map((f, i) => (
              <div 
                key={f.title} 
                className="group rounded-3xl border border-zinc-200/80 bg-gradient-to-br from-white to-zinc-50/50 p-8 shadow-sm transition-all hover:shadow-2xl hover:-translate-y-2 hover:border-emerald-200"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${f.gradient} shadow-lg text-white text-2xl transition-all group-hover:scale-110 group-hover:rotate-6`}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-zinc-800 mb-3">{f.title}</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cobrança Inteligente */}
      <section className="py-20 md:py-28 bg-zinc-50" id="cobranca">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle
            kicker="destaque"
            title="Cobrança automática que mantém tudo em dia"
            subtitle="Lembretes educados por WhatsApp e e-mail — antes, no dia e depois do vencimento, com link direto de pagamento."
          />
          <div className="mt-10 grid items-stretch gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Fluxo inteligente</h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-700">
                {[
                  "3 dias antes do vencimento",
                  "No dia do vencimento",
                  "+1, +3 e +7 dias pós-vencimento",
                  "Tudo com templates personalizáveis e link Pix",
                ].map((li) => (
                  <li key={li} className="flex items-start gap-2">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      ✓
                    </span>
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl border border-dashed border-emerald-200 bg-emerald-50/50 p-4 text-sm">
                <p className="font-medium text-emerald-800">Benefícios</p>
                <p className="mt-1 text-emerald-700">Menos atrasos, menos constrangimento e mais previsibilidade no seu caixa.</p>
              </div>
            </div>
            <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Exemplo de mensagem</h3>
              <div className="mt-4 space-y-3 text-sm">
                <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4">
                  <p className="text-zinc-700"><strong>Assunto:</strong> Lembrete de aluguel – vence em 3 dias</p>
                  <p className="mt-2 text-zinc-700">Olá, tudo bem? Passando pra lembrar que seu aluguel vence em <strong>15/10</strong>. Você pode pagar pelo link: <span className="text-emerald-700 underline">pag.to/abc123</span></p>
                  <p className="mt-1 text-zinc-500">Se já pagou, desconsidere :)</p>
                </div>
                <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4">
                  <p className="text-zinc-700"><strong>WhatsApp:</strong> Mensagem no dia do vencimento</p>
                  <p className="mt-2 text-zinc-700">Oi! Hoje vence o aluguel de <strong>R$ 1.750</strong>. Link de pagamento: <span className="text-emerald-700 underline">pag.to/abc123</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparativo */}
      <section className="border-t border-zinc-100 py-20 md:py-28 bg-white" id="comparativo">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle 
            kicker="por que escolher" 
            title="Para imobiliárias e locadores diretos"
            subtitle="Seja você uma imobiliária gerenciando vários imóveis ou um proprietário cuidando de suas propriedades, o Habita simplifica tudo."
          />
          <div className="mt-16 overflow-x-auto scrollbar-hide">
            <table className="w-full min-w-[720px] table-auto border-collapse overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm">
              <thead className="bg-gradient-to-r from-zinc-50 to-zinc-100 text-left text-sm">
                <tr>
                  <th className="p-4 font-semibold text-zinc-700">&nbsp;</th>
                  <th className="p-4 font-semibold text-zinc-700">Planilhas & WhatsApp</th>
                  <th className="p-4 font-semibold text-zinc-700">Software tradicional</th>
                  <th className="p-4 font-semibold text-emerald-700">Habita</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  ["Contratos digitais", false, true, true],
                  ["Cobrança automática via Pix", false, true, true],
                  ["Chat integrado proprietário ↔ inquilino", false, false, true],
                  ["Interface simples e intuitiva", false, false, true],
                  ["Funciona para imobiliárias E locadores", true, false, true],
                  ["Sem taxas abusivas", true, false, true],
                  ["Acesso mobile e desktop", false, true, true],
                ].map(([label, a, b, c]) => (
                  <tr key={label as string} className="border-t border-zinc-100 hover:bg-zinc-50/50 transition-colors">
                    <td className="p-4 font-medium text-zinc-800">{label as string}</td>
                    <td className="p-4 text-center">{a ? <span className="text-green-600 text-lg">✓</span> : <span className="text-red-500 text-lg">✗</span>}</td>
                    <td className="p-4 text-center">{b ? <span className="text-green-600 text-lg">✓</span> : <span className="text-red-500 text-lg">✗</span>}</td>
                    <td className="p-4 text-center bg-emerald-50/50">{c ? <span className="text-emerald-600 text-lg font-bold">✓</span> : <span className="text-red-500 text-lg">✗</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 text-2xl">
                🏢
              </div>
              <h3 className="text-xl font-bold text-zinc-800 mb-3">Para Imobiliárias</h3>
              <p className="text-zinc-600 leading-relaxed">
                Gerencie múltiplos imóveis e contratos em um único painel. Ideal para imobiliárias que buscam automatizar processos e reduzir custos operacionais.
              </p>
            </div>
            
            <div className="rounded-2xl border border-zinc-200 bg-white p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 text-2xl">
                👤
              </div>
              <h3 className="text-xl font-bold text-zinc-800 mb-3">Para Proprietários</h3>
              <p className="text-zinc-600 leading-relaxed">
                Você aluga diretamente sem imobiliária? Perfeito! Tenha controle total sobre seus imóveis com a mesma facilidade e profissionalismo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="border-t border-zinc-100 py-20 md:py-28 bg-zinc-50" id="contato">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl rounded-3xl border border-zinc-200/80 bg-white/80 backdrop-blur-sm p-10 md:p-12 text-center shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-zinc-900 to-zinc-700 bg-clip-text text-transparent">
              Pronto para simplificar seu aluguel?
            </h3>
            <p className="mt-4 text-lg text-zinc-600 leading-relaxed">
              Deixe seu contato e receba prioridade para testar o piloto.
            </p>
            
            <form className="mt-8 space-y-4 text-left" onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-700 mb-2">
                  Nome completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"
                  placeholder="Seu nome completo"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"
                  placeholder="seu@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-zinc-700 mb-2">
                  Telefone/WhatsApp
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  required
                  className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"
                  placeholder="(11) 99999-9999"
                />
              </div>
              
              <div>
                <label htmlFor="perfil" className="block text-sm font-medium text-zinc-700 mb-2">
                  Perfil
                </label>
                <select
                  id="perfil"
                  name="perfil"
                  required
                  className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"
                >
                  <option value="">Selecione seu perfil</option>
                  <option value="proprietario">Proprietário</option>
                  <option value="inquilino">Inquilino</option>
                  <option value="imobiliaria">Imobiliária</option>
                  <option value="corretor">Corretor</option>
                </select>
              </div>
              
              <div className="flex items-start space-x-3 pt-4">
                <input
                  type="checkbox"
                  id="termos"
                  name="termos"
                  required
                  className="mt-1 h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-200"
                />
                <label htmlFor="termos" className="text-sm text-zinc-600 leading-relaxed">
                  Ao enviar este formulário, você concorda em compartilhar seus dados conosco para usarmos apenas em comunicação sobre o piloto do Habita.
                </label>
              </div>
              
              <button
                type="submit"
                className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-4 text-white font-semibold shadow-lg shadow-emerald-200 transition-all hover:shadow-xl hover:shadow-emerald-300 hover:scale-105 mt-6"
              >
                <span className="relative z-10">Quero participar do piloto</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-400 opacity-0 transition-opacity group-hover:opacity-100"></div>
              </button>
              
              <FormMessage message={formMessage} />
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100 bg-zinc-50 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-500 text-white shadow-lg">
              <span className="text-sm font-bold">H</span>
            </div>
            <span className="text-base font-bold text-zinc-800">Habita</span>
          </div>
          <nav className="flex items-center gap-8 text-sm text-zinc-600 font-medium">
            <a href="#recursos" className="transition-colors hover:text-emerald-600">Recursos</a>
            <a href="#cobranca" className="transition-colors hover:text-emerald-600">Cobrança</a>
            <a href="#comparativo" className="transition-colors hover:text-emerald-600">Comparativo</a>
            <a href="#" className="transition-colors hover:text-emerald-600">Privacidade</a>
            <a href="#" className="transition-colors hover:text-emerald-600">Termos</a>
          </nav>
          <p className="text-sm text-zinc-500">© {new Date().getFullYear()} Habita. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
