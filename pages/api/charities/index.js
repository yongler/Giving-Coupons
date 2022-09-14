export default async function handler(req, res) {
  try {
    const httpMethod = req.method;

    if (httpMethod === "GET") {
      res.status(200).json([
        {
          id: "79ecd0cf-b9c1-452d-82c3-63db27554a11",
          name: "Autism Association (Singapore)",
          description:
            "The Autism Association (Singapore) is a Social Service Organisation in Singapore, dedicated to supporting and serving individuals with autism towards maximising their potential, helping them lead meaningful and quality lives in society.",
          image: null,
        },
        {
          id: "0b09df5a-8f42-4ae4-967b-9f40d81796da",
          name: "Children's Cancer Foundation",
          description:
            "Children's Cancer Foundation (CCF) is a social service agency with a mission to improve the quality of life of children with cancer and their families and children impacted by cancer through enhancing their emotional, social and medical well-being. ",
          image: null,
        },
        {
          id: "69a5f40f-31b3-45b0-aeec-55d542b8199c",
          name: "Mercy Relief",
          description:
            "Headquartered in Singapore, Mercy Relief was established in 2003 to respond to human tragedies and disasters in the Asia Pacific. Today, we are Singapore's leading independent disaster relief agency with dedicated leadership, capacity building expertise and an affiliate network operating across the entire disaster management cycle.",
          image: null,
        },
      ]);
    } else {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}
