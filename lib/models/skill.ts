import { Schema, model, models } from "mongoose";

const SkillSchema = new Schema({
  name: { type: String, required: true },
  percentage: { type: Number, required: true, default: 90 },
  description: { type: String },
});

const Skill = models.SkillSchema || model("Skill", SkillSchema);

export default Skill;
