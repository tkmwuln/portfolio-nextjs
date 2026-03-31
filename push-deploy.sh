#!/bin/zsh
# Auto push + monitor deploy
cd /Users/wulsmac/portfolio-website

echo "🚀 Pushing to redesign branch..."
git push origin redesign

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Push berhasil! Vercel sedang deploy..."
  echo "📺 Cek progress di:"
  echo "   https://vercel.com/tkmwulns-projects/portfolio-nextjs/deployments"
  echo ""
  echo "🌐 Preview URL setelah deploy:"
  echo "   https://portfolio-nextjs-git-redesign-tkmwulns-projects.vercel.app/"
  
  # Open browser to deployment page
  open "https://vercel.com/tkmwulns-projects/portfolio-nextjs/deployments"
else
  echo "❌ Push gagal. Cek koneksi internet / GitHub credentials."
fi
