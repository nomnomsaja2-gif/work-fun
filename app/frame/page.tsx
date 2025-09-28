import { frameMetadata } from '../frame-metadata'
import { Metadata } from 'next'

export const metadata: Metadata = frameMetadata

export default function FramePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">WORK.FUN</h1>
      <p className="text-xl mb-8">Earn WORK tokens by doing simple social actions</p>
    </div>
  )
}