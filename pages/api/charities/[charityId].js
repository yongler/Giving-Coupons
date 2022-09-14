export default async function handler(req, res) {
  try {
    const httpMethod = req.method;
    const charityId = req.query.charityId;

    if (httpMethod === "GET") {
      res.status(200).json({
        id: charityId,
        name: "Autism Association (Singapore)",
        description:
          "The Autism Association (Singapore) is a Social Service Organisation in Singapore, dedicated to supporting and serving individuals with autism towards maximising their potential, helping them lead meaningful and quality lives in society.",
        image: null,
      });
    } else if (httpMethod === "DELETE") {
      res.status(200).json({
        charityId,
      });
    } else {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}
