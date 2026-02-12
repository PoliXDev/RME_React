import { useRef, useEffect } from 'react';

export function NightSkyCanvas() {
  const milkyWayRef = useRef(null);
  const starsRef = useRef(null);

  useEffect(() => {
    const canvasMw = milkyWayRef.current;
    const canvas = starsRef.current;
    if (!canvasMw || !canvas) return;

    const dpr = window.devicePixelRatio || 1;

    const resizeCanvases = (w, h) => {
      canvasMw.width = w * dpr;
      canvasMw.height = h * dpr;
      canvasMw.style.width = `${w}px`;
      canvasMw.style.height = `${h}px`;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctxMw = canvasMw.getContext('2d');
      const ctx = canvas.getContext('2d');
      ctxMw.scale(dpr, dpr);
      ctx.scale(dpr, dpr);
    };

    const sNumber = 600;
    const sSize = 0.3;
    const sSizeR = 0.6;
    const sAlphaR = 0.5;
    const shootingStarDensity = 0.01;
    const shootingStarBaseXspeed = 30;
    const shootingStarBaseYspeed = 15;
    const shootingStarBaseLength = 8;
    const shootingStarBaseLifespan = 60;
    const shootingStarsColors = ['#a1ffba', '#a1d2ff', '#fffaa1', '#ffa1a1'];
    const mwStarCount = 30000;
    const mwRandomStarProp = 0.04;
    const mwClusterCount = 150;
    const mwClusterStarCount = 1000;
    const mwClusterSize = 120;
    const mwClusterSizeR = 80;
    const mwClusterLayers = 10;
    const mwAngle = 0.65;
    const mwBandWidth = 0.14;
    const mwHueMin = 150;
    const mwHueMax = 300;
    const mwWhiteProportionMin = 50;
    const mwWhiteProportionMax = 65;

    const randomArrayLength = 1000;
    const hueArrayLength = 1000;

    let randomArray = [];
    let hueArray = [];
    let randomArrayIterator = 0;
    let StarsArray = [];
    let ShootingStarsArray = [];
    let animationId = null;

    class Star {
      constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.alpha = size / (sSize + sSizeR);
        this.baseHue = hueArray[Math.floor(Math.random() * hueArrayLength)];
        this.baseHueProportion = Math.random();
        this.randomIndexa = Math.floor(Math.random() * randomArrayLength);
        this.randomIndexh = this.randomIndexa;
        this.randomValue = randomArray[this.randomIndexa];
      }
      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        const rAlpha = this.alpha + Math.min((this.randomValue - 0.5) * sAlphaR, 1);
        const rHue = randomArray[this.randomIndexh] > this.baseHueProportion ? hueArray[this.randomIndexa] : this.baseHue;
        ctx.fillStyle = `hsla(${rHue},100%,85%,${rAlpha})`;
        ctx.fill();
      }
      update(ctx) {
        this.randomIndexh = this.randomIndexa;
        this.randomIndexa = this.randomIndexa >= 999 ? 0 : this.randomIndexa + 1;
        this.randomValue = randomArray[this.randomIndexa];
        this.draw(ctx);
      }
    }

    class ShootingStar {
      constructor(x, y, speedX, speedY, color) {
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.framesLeft = shootingStarBaseLifespan;
        this.color = color;
      }
      goingOut() {
        return this.framesLeft <= 0;
      }
      ageModifier() {
        const halfLife = shootingStarBaseLifespan / 2.0;
        return Math.pow(1.0 - Math.abs(this.framesLeft - halfLife) / halfLife, 2);
      }
      draw(ctx) {
        const am = this.ageModifier();
        const endX = this.x - this.speedX * shootingStarBaseLength * am;
        const endY = this.y - this.speedY * shootingStarBaseLength * am;
        const gradient = ctx.createLinearGradient(this.x, this.y, endX, endY);
        gradient.addColorStop(0, '#fff');
        gradient.addColorStop(Math.min(am, 0.7), this.color);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }
      update(ctx) {
        this.framesLeft--;
        this.x += this.speedX;
        this.y += this.speedY;
        this.draw(ctx);
      }
    }

    function milkyWayX(innerWidth) {
      return Math.floor(Math.random() * innerWidth);
    }
    function milkyWayYFromX(xPos, innerWidth, innerHeight, mode) {
      const offset = (innerWidth / 2 - xPos) * mwAngle;
      const centerY = innerHeight / 2 + offset;
      if (mode === 'star') {
        const spread = innerHeight * mwBandWidth * (Math.random() - 0.5);
        const jitter = 20 * (Math.random() - 0.5);
        return Math.floor(centerY + spread + jitter);
      }
      const spreadCluster = innerHeight * mwBandWidth * 0.8 * (Math.random() - 0.5);
      const jitterCluster = 30 * (Math.random() - 0.5);
      return Math.floor(centerY + spreadCluster + jitterCluster);
    }

    function drawMilkyWayCanvas(innerWidth, innerHeight) {
      const ctxMw = canvasMw.getContext('2d');
      ctxMw.clearRect(0, 0, innerWidth, innerHeight);

      const bg = ctxMw.createLinearGradient(0, 0, 0, innerHeight);
      bg.addColorStop(0, '#0d0e12');
      bg.addColorStop(0.5, '#15171c');
      bg.addColorStop(1, '#0a0b0e');
      ctxMw.fillStyle = bg;
      ctxMw.fillRect(0, 0, innerWidth, innerHeight);

      for (let i = 0; i < mwStarCount; i++) {
        const xPos = milkyWayX(innerWidth);
        const yPos = Math.random() < mwRandomStarProp ? Math.floor(Math.random() * innerHeight) : milkyWayYFromX(xPos, innerWidth, innerHeight, 'star');
        ctxMw.beginPath();
        ctxMw.arc(xPos, yPos, Math.random() * 0.27, 0, Math.PI * 2, false);
        ctxMw.fillStyle = `hsla(0,100%,100%,${0.4 + Math.random() * 0.6})`;
        ctxMw.fill();
      }

      for (let i = 0; i < mwClusterCount; i++) {
        const xPos = milkyWayX(innerWidth);
        const yPos = milkyWayYFromX(xPos, innerWidth, innerHeight, 'cluster');
        const distToCenter = (1 - Math.abs(xPos - innerWidth / 2) / (innerWidth / 2)) * (1 - Math.abs(yPos - innerHeight / 2) / (innerHeight / 2));
        const size = mwClusterSize + Math.random() * mwClusterSizeR;
        const hue = mwHueMin + Math.floor((Math.random() * 0.5 + distToCenter * 0.5) * (mwHueMax - mwHueMin));
        const baseWhiteProportion = mwWhiteProportionMin + Math.random() * (mwWhiteProportionMax - mwWhiteProportionMin);

        const starsPerLayer = Math.floor(mwClusterStarCount / mwClusterLayers);
        for (let layer = 1; layer < mwClusterLayers; layer++) {
          const layerRadius = (size * layer) / mwClusterLayers;
          for (let j = 1; j < starsPerLayer; j++) {
            const posX = xPos + 2 * layerRadius * (Math.random() - 0.5);
            const posY = yPos + 2 * Math.sqrt(Math.pow(layerRadius, 2) - Math.pow(xPos - posX, 2)) * (Math.random() - 0.5);
            const starSize = 0.05 + Math.random() * 0.15;
            const alpha = 0.3 + Math.random() * 0.4;
            const whitePct = baseWhiteProportion + 15 + 15 * distToCenter + Math.floor(Math.random() * 10);
            ctxMw.beginPath();
            ctxMw.arc(posX, posY, starSize, 0, Math.PI * 2, false);
            ctxMw.fillStyle = `hsla(${hue},100%,${whitePct}%,${alpha})`;
            ctxMw.fill();
          }
        }
        const gradient = ctxMw.createRadialGradient(xPos, yPos, 0, xPos, yPos, size);
        gradient.addColorStop(0, `hsla(${hue},100%,${baseWhiteProportion}%,0.002)`);
        gradient.addColorStop(0.25, `hsla(${hue},100%,${baseWhiteProportion + 30}%,${0.01 + 0.01 * distToCenter})`);
        gradient.addColorStop(0.4, `hsla(${hue},100%,${baseWhiteProportion + 15}%,0.005)`);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctxMw.beginPath();
        ctxMw.arc(xPos, yPos, size, 0, Math.PI * 2, false);
        ctxMw.fillStyle = gradient;
        ctxMw.fill();
      }
    }

    function init(innerWidth, innerHeight) {
      randomArray = Array.from({ length: randomArrayLength }, () => Math.random());
      hueArray = Array.from({ length: hueArrayLength }, () => {
        let rHue = Math.floor(Math.random() * 160);
        if (rHue > 60) rHue += 110;
        return rHue;
      });

      StarsArray = [];
      for (let i = 0; i < sNumber; i++) {
        const size = Math.random() * sSizeR + sSize;
        const x = Math.random() * (innerWidth - size * 4) + size * 2;
        const y = Math.random() * (innerHeight - size * 4) + size * 2;
        StarsArray.push(new Star(x, y, size));
      }
      ShootingStarsArray = [];
      drawMilkyWayCanvas(innerWidth, innerHeight);
    }

    function animate() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, w, h);

      StarsArray.forEach((s) => s.update(ctx));

      if (randomArray[randomArrayIterator] < shootingStarDensity) {
        const posX = Math.floor(Math.random() * w);
        const posY = Math.floor(Math.random() * 150);
        const speedX = (Math.random() - 0.5) * shootingStarBaseXspeed;
        const speedY = Math.random() * shootingStarBaseYspeed;
        const color = shootingStarsColors[Math.floor(Math.random() * shootingStarsColors.length)];
        ShootingStarsArray.push(new ShootingStar(posX, posY, speedX, speedY, color));
      }

      let i = ShootingStarsArray.length - 1;
      while (i >= 0) {
        if (ShootingStarsArray[i].goingOut()) {
          ShootingStarsArray.splice(i, 1);
        } else {
          ShootingStarsArray[i].update(ctx);
        }
        i--;
      }

      randomArrayIterator = randomArrayIterator + 1 >= randomArrayLength ? 0 : randomArrayIterator + 1;
      animationId = requestAnimationFrame(animate);
    }

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      resizeCanvases(w, h);
      init(w, h);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={milkyWayRef}
        className="fixed inset-0 w-full h-full -z-10"
        aria-hidden="true"
        style={{ display: 'block' }}
      />
      <canvas
        ref={starsRef}
        className="fixed inset-0 w-full h-full -z-10"
        aria-hidden="true"
        style={{ display: 'block' }}
      />
    </>
  );
}
