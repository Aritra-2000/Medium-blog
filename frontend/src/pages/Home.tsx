
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pen, Users, Zap, Globe } from "lucide-react"
import { Appbar } from "@/components/Appbar"
import {Link} from "react-router-dom"

export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Appbar check={false}/>
      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">What Our Platform Means</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover a space where ideas flourish, knowledge is shared, and communities are built. 
            Our platform is more than just a blog - it's a hub for thinkers, creators, and learners.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Pen className="h-6 w-6 mr-2 text-primary" />
                Express Yourself
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Share your thoughts, experiences, and expertise with a global audience. 
                Our platform provides the tools you need to craft compelling articles and stories.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-6 w-6 mr-2 text-primary" />
                Connect with Others
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Engage with like-minded individuals, participate in discussions, and build a 
                network of fellow enthusiasts in your field of interest.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-6 w-6 mr-2 text-primary" />
                Grow Your Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Learn from a diverse range of perspectives and topics. Our platform is a 
                treasure trove of knowledge waiting to be explored and applied.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-6 w-6 mr-2 text-primary" />
                Reach a Global Audience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Your ideas deserve to be heard. Our platform provides the visibility you need 
                to reach readers from all corners of the world.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
          <Link to={'/signup'}>
          <Button size="lg" className="text-lg px-8">
            Join Our Community
          </Button>
          </Link>
        </section>
      </main>
    </div>
  )
}