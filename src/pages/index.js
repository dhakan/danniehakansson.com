import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import cvFile from "../assets/cv-en.pdf"

const frontendSkills = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Gatsby",
  "Next"
]

const backendSkills = [
  "Node",
  "Python",
  "Django",
  "Docker",
  "Kubernetes",
  "Google Cloud Platform",
  "AWS"
]

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "dannie.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 120) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Home" />
      <section className="px-8 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div>
            <h1 className="h1 text-indigo-500">
              Dannie Håkansson
            </h1>
            <h2 className="h2 text-gray-500">
              Fullstack Developer
            </h2>
            <div className="mt-4 md:mt-8 flex flex-col md:flex-row md:items-center">
              <div className="flex-none">
                <Image
                  data={data}
                  className="w-20 h-20 md:w-32 md:h-32 object-top border-4 border-gray-300 bg-gray-100 rounded-full"
                />
              </div>
              <p className="mt-4 md:mt-0 md:ml-8">
                Solution-oriented developer with a passion for exercise and
                well-being. I am comfortable working in smaller as well as
                bigger teams. I value highly that my colleagues are feeling as
                good as possible, and I prefer to work with structure and
                process with a focus on team communication. I never resist to
                learn new technologies, and I am always on the lookout for
                possible ways to improve myself in the profession.
              </p>
            </div>
            <div className="mt-8 -mx-2 flex flex-col sm:flex-row">
              <div className="px-2">
                <a
                  href={cvFile}
                  className="px-4 py-3 inline-block w-full sm:w-auto text-center border border-transparent bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-600 text-white font-semibold rounded-lg shadow-md active:shadow-none"
                >
                  Download CV
                </a>
              </div>
              <div className="mt-4 sm:mt-0 px-2">
                <a
                  href="mailto:danniehakan@gmail.com"
                  className="px-4 py-3 inline-block w-full sm:w-auto text-center border border-indigo-500 hover:bg-indigo-500 active:bg-indigo-600 text-indigo-500 hover:text-white font-semibold rounded-lg"
                >
                  Contact me
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-indigo-500 px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="-mx-4 flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 mb-8 md:mb-0 px-4">
              <h2 className="h2 bordered-title mb-8 text-white">Frontend</h2>
              <div className="flex flex-wrap items-center -mx-1">
                {frontendSkills.map((skill, i) => (
                  <div
                    className="bg-white text-indigo-500 rounded-full m-1 px-4 py-1"
                    key={i}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2 px-4">
              <h2 className="h2 bordered-title mb-8 text-white">Backend</h2>
              <div className="flex flex-wrap items-center -mx-1">
                {backendSkills.map((skill, i) => (
                  <div
                    className="bg-white text-indigo-500 rounded-full m-1 px-4 py-1"
                    key={i}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage
