import { FiChevronDown } from "react-icons/fi";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";

const RecruitmentFaq = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const accrodStyle = (panel: string) => ({
    backdropFilter: "blur(9.5px)",
    WebkitBackdropFilter: "blur(9.5px)",
    borderRadius: "1rem 1rem 1rem 1rem",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "white",
    borderBottom:
      expanded !== panel ? "1px solid rgba(255,255,255,.3)" : "none",
  });
  const summaryStyle = {
    backgroundColor: "rgb(26,26,26)",
  };

  const handleChange = (panel: any) => (event: any, isExpanded: any) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className="row d-flex justify-content-center">
      <h3 className="index-header mb-4">Frequently Asked Questions</h3>
      <div className="col-10">
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          sx={accrodStyle("panel1")}
        >
          <AccordionSummary
            expandIcon={<FiChevronDown className="text-white" />}
            id="panel1bh-header"
            sx={summaryStyle}
          >
            <Typography className="f-medium">
              I&apos;m a first year student, can I apply ?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Yes! We are always looking for new students to join our team.
            Although some theoretical background can be useful, it&apos;s not
            required. If you are willing to learn, you can apply and give your
            best.
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          sx={accrodStyle("panel2")}
        >
          <AccordionSummary
            expandIcon={<FiChevronDown className="text-white" />}
            id="panel2bh-header"
            sx={summaryStyle}
          >
            <Typography className="f-medium">
              Can I apply in the next semester ?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            We usually open the recruitment in each semester. But it will depend
            on the available opportunities within the team. We can&apos;t
            promise that we will have the same opportunities in each department.
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
          sx={accrodStyle("panel3")}
        >
          <AccordionSummary
            expandIcon={<FiChevronDown className="text-white" />}
            id="panel3bh-header"
            sx={summaryStyle}
          >
            <Typography className="f-medium">
              I&apos;m from a different university, can I apply ?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul className="list-none">
              <li>Short answer: Yes you can.</li>
              <li>
                Long answer: Although we accept students from different
                universities, we need to individually evaluate the situation.
                This is, where is you university located and your availability
                for example.
              </li>
            </ul>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
          sx={accrodStyle("panel4")}
        >
          <AccordionSummary
            expandIcon={<FiChevronDown className="text-white" />}
            id="panel4bh-header"
            sx={summaryStyle}
          >
            <Typography className="f-medium">
              How much time do I need to allocate to the project ?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            This is one of the most asked questions we receive. We do not ask
            for anyone to give X amount of hours to the project. We set goals
            and objectives, it&apos;s up to you on how you organize your time to
            finish your tasks.
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default RecruitmentFaq;
