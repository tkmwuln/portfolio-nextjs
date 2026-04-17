#!/bin/zsh
# Auto push + monitor deploy for Putri Wulandari Portfolio
cd /Users/wulsmac/portfolio-website

echo "🧹 Cleaning up local changes..."
git add .

echo "📝 Committing changes..."
# Use a dynamic message or fixed one for ease of use
COMMIT_MSG="fix: refine dashboard sidebar, login ui, and auth middleware"
git commit -m "$COMMIT_MSG" 2>/dev/null || echo "Nothing to commit, pushing anyway..."

echo "🚀 Pushing to redesign branch..."
git push origin redesign

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Push berhasil! Vercel sedang memproses deployment terbaru..."
  echo "📺 Pantau proses di:"
  echo "   https://vercel.com/tkmwulns-projects/portfolio-nextjs/deployments"
  echo ""
  echo "🌐 Link Dashboard (setelah deploy selesai):"
  echo "   https://portfolio-nextjs-git-redesign-tkmwulns-projects.vercel.app/dashboard"
  echo ""
  echo "🙏 HARAP REFRESH (CMD+R) DASHBOARD SETELAH DEPLOY SELESAI."
  
  # Open browser to deployment page
  open "https://vercel.com/tkmwulns-projects/portfolio-nextjs/deployments"
else
  echo ""
  echo "❌ Push gagal. Pastikan:"
  echo "   1. Internet stabil."
  echo "   2. Sudah login GitHub di terminal."
  echo "   3. Tidak ada konflik file (git pull mungkin diperlukan jika dikerjakan di tempat lain)."
  echo ""
fi
