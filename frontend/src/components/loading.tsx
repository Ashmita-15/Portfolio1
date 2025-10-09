import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="centerContent">
      <div className="loading-container">
        <div className="cube-loader">
          <div className="cube">
            <div className="face front"></div>
            <div className="face back"></div>
            <div className="face right"></div>
            <div className="face left"></div>
            <div className="face top"></div>
            <div className="face bottom"></div>
          </div>
        </div>
        <div className="loading-text">Ashmita Barnwal</div>
      </div>

      <style>{`
        .centerContent {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: #000;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 9999;
          perspective: 1000px;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
        }

        .cube-loader {
          width: 100px;
          height: 100px;
          perspective: 1000px;
        }

        .cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: rotateCube 4s linear infinite;
        }

        .face {
          position: absolute;
          width: 100px;
          height: 100px;
          border: 2px solid #fff;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(5px);
        }

        .front {
          transform: rotateY(0deg) translateZ(50px);
        }

        .back {
          transform: rotateY(180deg) translateZ(50px);
        }

        .right {
          transform: rotateY(90deg) translateZ(50px);
        }

        .left {
          transform: rotateY(-90deg) translateZ(50px);
        }

        .top {
          transform: rotateX(90deg) translateZ(50px);
        }

        .bottom {
          transform: rotateX(-90deg) translateZ(50px);
        }

        .loading-text {
          color: #ffffff;
          font-size: 24px;
          font-weight: 300;
          font-family: 'Courier New', monospace;
          letter-spacing: 2px;
          animation: pulse 2s infinite;
          text-align: center;
        }

        @keyframes rotateCube {
          0% {
            transform: rotateX(0deg) rotateY(0deg);
          }
          25% {
            transform: rotateX(-90deg) rotateY(0deg);
          }
          50% {
            transform: rotateX(-90deg) rotateY(-90deg);
          }
          75% {
            transform: rotateX(0deg) rotateY(-90deg);
          }
          100% {
            transform: rotateX(0deg) rotateY(-180deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
