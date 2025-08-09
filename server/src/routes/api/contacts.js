import { Router } from "express";
import { Contact, User } from "../../models/index.js";
import { trimUnusedFields } from "../../utils/validation.js";

const router = Router();

router.post("/", async (req, res) => {
  const { name, email, phone, notes, tags } = req.body;
  const contactData = trimUnusedFields({
    owner: req.user.id,
    name,
    email,
    phone: parseInt(phone),
    notes,
    tags,
  });

  if (!contactData.name) {
    return res.status(400).json({
      error: "You must include the name field when creating a contact",
    });
  }

  let contact = await Contact.create(contactData);

  await User.findByIdAndUpdate(req.user.id, {
    $push: { contacts: contact.id },
  });

  res.json({ created: contact });
});

router.get("/", async (req, res) => {
  const user = await User.findById(req.user.id).populate("contacts");
  res.json([...user.contacts]);
});

router.delete("/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, {
    $pull: { contacts: req.params.id },
  });

  res.status(200).send();
});

router.put("/:_id", async (req, res) => {
  const { _id } = req.params;
  const { name, email, phone, tags } = req.body;
  const contact = { name, email, phone, tags, _id };

  await Contact.findByIdAndUpdate(_id, contact);

  res.json(contact);
});
export default router;
