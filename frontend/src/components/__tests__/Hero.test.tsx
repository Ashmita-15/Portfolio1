import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Hero from '../Hero'

// Mock Three.js components
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => <div data-testid="canvas">{children}</div>
}))

vi.mock('@react-three/drei', () => ({
  OrbitControls: () => <div data-testid="orbit-controls" />,
  Sphere: () => <div data-testid="sphere" />,
  MeshDistortMaterial: () => <div data-testid="mesh-distort-material" />
}))

describe('Hero Component', () => {
  it('renders the main heading', () => {
    render(<Hero />)
    
    expect(screen.getByText("Hi, I'm")).toBeInTheDocument()
    expect(screen.getByText('Rohit Dutta')).toBeInTheDocument()
  })

  it('renders the typing animation text', () => {
    render(<Hero />)
    
    expect(screen.getByText('Data Scientist & AI Engineer')).toBeInTheDocument()
  })

  it('renders the description paragraph', () => {
    render(<Hero />)
    
    expect(screen.getByText(/Passionate about transforming data/)).toBeInTheDocument()
  })

  it('renders the download resume button', () => {
    render(<Hero />)
    
    expect(screen.getByText('Download Resume')).toBeInTheDocument()
  })

  it('renders the get in touch button', () => {
    render(<Hero />)
    
    expect(screen.getByText('Get In Touch')).toBeInTheDocument()
  })

  it('renders social media links', () => {
    render(<Hero />)
    
    // Check for social media icons (they should be present)
    const socialLinks = screen.getAllByRole('link')
    expect(socialLinks.length).toBeGreaterThan(0)
  })
})
