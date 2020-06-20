const express = require("express");
const app = express();
const connectDb = require("./config/db");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PORT = 5000;

connectDb();

const CategorySchema = new Schema({
  slug: {
    type: String,
    isRequired: true,
  },
  name: {
    type: String,
    isRequired: true,
  },
  parent: {
    type: String,
  },
});

const Category = mongoose.model("category", CategorySchema);

app.get("/api", (req, res) => res.send("Hello World!"));
app.put("/api/categories", async (req, res) => {
  const categories = [
    {
      slug: "electronics",
      name: "Electronics",
    },
    {
      slug: "embedded",
      name: "Embedded",
      parent: "electronics",
    },
    {
      slug: "cases",
      name: "Cases",
    },
    {
      slug: "big",
      name: "Big",
      parent: "cases",
    },
    {
      slug: "small",
      name: "Small",
      parent: "cases",
    },
  ];

  try {
    await Category.insertMany(categories.map((c) => new Category(c)));

    res.json({ msg: "Inserted" });
  } catch (err) {
    console.error(err);
    res.send(err.message);
  }
});

app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find();

    const categoryByLevel = categories.reduce(
      (acc, cur) => {
        if (cur.parent) {
          return { ...acc, sub: [...acc.sub, cur] };
        }
        return { ...acc, main: [...acc.main, cur] };
      },
      { main: [], sub: [] }
    );

    const result = categoryByLevel.sub.reduce(
      (acc, subCat) => {
        const mainCatIndex = acc.findIndex(
          (c) => String(c.slug) === String(subCat.parent)
        );
        let mainCat = acc[mainCatIndex];

        if (mainCatIndex !== -1) {
          if (!mainCat.subCategories || !Array.isArray(mainCat.subCategories)) {
            const { _id, slug, name, parent } = mainCat;
            mainCat = { _id, slug, name, parent, subCategories: [subCat] };
          } else {
            mainCat.subCategories.push(subCat);
          }
        }

        acc[mainCatIndex] = mainCat;

        return acc;
      },
      [...categoryByLevel.main]
    );

    res.json(result);
  } catch (err) {
    console.error(err);
    res.send(err.message);
  }
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
