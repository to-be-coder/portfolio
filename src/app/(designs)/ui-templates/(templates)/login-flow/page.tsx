import LoginDemo from '@/components/demo/log-in/login-demo'

export default function LoginFlowDemoPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold">Login Flow Demo</h2>
      <div className="mt-8 bg-gray-400 p-8 rounded-md h-[700px]">
        <LoginDemo />
      </div>
    </div>
  )
}
