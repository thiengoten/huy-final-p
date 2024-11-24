"use client"

import React from "react"

interface LoaderProps {
  className?: string
}

const Loader: React.FC<LoaderProps> = ({ className = "" }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${className}`}
    >
      <div className="loader" />
      <style>{`
        .loader {
          width: 90px;
          height: 80px;
          background: linear-gradient(
              #0000 calc(1 * 100% / 6),
              currentColor 0 calc(3 * 100% / 6),
              #0000 0
            ),
            linear-gradient(
              #0000 calc(2 * 100% / 6),
              currentColor 0 calc(4 * 100% / 6),
              #0000 0
            ),
            linear-gradient(
              #0000 calc(3 * 100% / 6),
              currentColor 0 calc(5 * 100% / 6),
              #0000 0
            );
          background-size: 20px 400%;
          background-repeat: no-repeat;
          animation: matrix 1s infinite linear;
        }
        @keyframes matrix {
          0% {
            background-position: 0% 100%, 50% 100%, 100% 100%;
          }
          100% {
            background-position: 0% 0%, 50% 0%, 100% 0%;
          }
        }
      `}</style>
    </div>
  )
}

export default Loader
