export default function LoadingAnalysis() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <h2 className="text-xl font-semibold">당신의 성격을 분석하고 있어요...</h2>
        <p className="text-muted-foreground">잠시만 기다려주세요 🧠</p>
      </div>
    </div>
  );
}