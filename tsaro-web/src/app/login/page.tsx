import { login, signup } from './actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-obsidian text-white relative tactical-mesh">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/40 pointer-events-none"></div>

      <div className="w-full max-w-md p-8 bg-charcoal border border-white/10 rounded-lg shadow-2xl relative z-10 capability-card">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-brandRed">Admin Access</h1>
          <p className="text-textMuted text-sm">Tsaro Global Defence CMS</p>
        </div>

        <form className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-textLight mb-1" htmlFor="email">
              Secure Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="operator@tsaro.com"
              required
              className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded focus:outline-none focus:border-brandRed focus:ring-1 focus:ring-brandRed transition-colors text-white placeholder-white/30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-textLight mb-1" htmlFor="password">
              Clearance Passkey
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded focus:outline-none focus:border-brandRed focus:ring-1 focus:ring-brandRed transition-colors text-white placeholder-white/30"
            />
          </div>

          {error && (
            <div className="bg-brandRed/20 text-brandRed border border-brandRed/50 p-3 rounded text-sm font-medium mt-2">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3 mt-4">
            <button
              formAction={login}
              className="btn-primary-red w-full px-4 py-3 rounded text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2"
            >
              Authenticate
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>

            {/* Note: In a real production app, you might want to remove the signup button 
                after the first admin registers, or hide it behind a specific invite link. */}
            <button
              formAction={signup}
              className="w-full px-4 py-3 rounded text-sm font-semibold tracking-wider uppercase border border-white/15 bg-white/5 hover:bg-white/10 text-textLight transition-all"
            >
              First Time Setup (Register)
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
