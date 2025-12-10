import { EnterpriseBadge, Select, Typography } from "@humansignal/ui";
import { useCallback, useContext } from "react";
import { Button } from "@humansignal/ui";
import { Form, Input, TextArea } from "../../components/Form";
import { RadioGroup } from "../../components/Form/Elements/RadioGroup/RadioGroup";
import { ProjectContext } from "../../providers/ProjectProvider";
import { cn } from "../../utils/bem";
import { HeidiTips } from "../../components/HeidiTips/HeidiTips";
import { FF_LSDV_E_297, isFF } from "../../utils/feature-flags";
import { createURL } from "../../components/HeidiTips/utils";
import { useTranslation } from "react-i18next";

export const GeneralSettings = () => {
  const { project, fetchProject } = useContext(ProjectContext);
  const { t } = useTranslation();

  const updateProject = useCallback(() => {
    if (project.id) fetchProject(project.id, true);
  }, [project, fetchProject]);

  const colors = ["#FDFDFC", "#FF4C25", "#FF750F", "#ECB800", "#9AC422", "#34988D", "#617ADA", "#CC6FBE"];

  const samplings = [
    { value: "Sequential", label: t("settings.general.sampling.sequential.label"), description: t("settings.general.sampling.sequential.description") },
    { value: "Uniform", label: t("settings.general.sampling.uniform.label"), description: t("settings.general.sampling.uniform.description") },
  ];

  return (
    <div className={cn("general-settings").toClassName()}>
      <div className={cn("general-settings").elem("wrapper").toClassName()}>
        <h1>{t("settings.general.title")}</h1>
        <div className={cn("settings-wrapper").toClassName()}>
          <Form action="updateProject" formData={{ ...project }} params={{ pk: project.id }} onSubmit={updateProject}>
            <Form.Row columnCount={1} rowGap="16px">
              <Input name="title" label={t("settings.general.projectName")} />

              <TextArea name="description" label={t("settings.general.description")} style={{ minHeight: 128 }} />
              {isFF(FF_LSDV_E_297) && (
                <div className={cn("workspace-placeholder").toClassName()}>
                  <div className={cn("workspace-placeholder").elem("badge-wrapper").toClassName()}>
                    <div className={cn("workspace-placeholder").elem("title").toClassName()}>
                      {t("settings.general.workspace.title")}
                    </div>
                    <EnterpriseBadge className="ml-2" />
                  </div>
                  <Select placeholder={t("settings.general.workspace.placeholder")} disabled options={[]} />
                  <Typography size="small" className="my-tight">
                    {t("settings.general.workspace.tip")}{" "}
                    <a
                      target="_blank"
                      href={createURL(
                        "https://docs.humansignal.com/guide/manage_projects#Create-workspaces-to-organize-projects",
                        {
                          experiment: "project_settings_tip",
                          treatment: "simplify_project_management",
                        },
                      )}
                      rel="noreferrer"
                      className="underline hover:no-underline"
                    >
                      {t("common.learnMore")}
                    </a>
                  </Typography>
                </div>
              )}
              <RadioGroup name="color" label={t("settings.general.color")} size="large" labelProps={{ size: "large" }}>
                {colors.map((color) => (
                  <RadioGroup.Button key={color} value={color}>
                    <div className={cn("color").toClassName()} style={{ "--background": color }} />
                  </RadioGroup.Button>
                ))}
              </RadioGroup>

              <RadioGroup label={t("settings.general.taskSampling")} labelProps={{ size: "large" }} name="sampling" simple>
                {samplings.map(({ value, label, description }) => (
                  <RadioGroup.Button
                    key={value}
                    value={`${value} sampling`}
                    label={`${label} ${t("settings.general.sampling.suffix")}`}
                    description={description}
                  />
                ))}
                {isFF(FF_LSDV_E_297) && (
                  <RadioGroup.Button
                    key="uncertainty-sampling"
                    value=""
                    label={
                      <>
                        {t("settings.general.sampling.uncertainty")} <EnterpriseBadge className="ml-2" />
                      </>
                    }
                    disabled
                    description={
                      <>
                        {t("settings.general.sampling.uncertaintyDescription")}{" "}
                        <a
                          target="_blank"
                          href={createURL("https://docs.humansignal.com/guide/active_learning", {
                            experiment: "project_settings_workspace",
                            treatment: "workspaces",
                          })}
                          rel="noreferrer"
                        >
                          {t("common.learnMore")}
                        </a>
                      </>
                    }
                  />
                )}
              </RadioGroup>
            </Form.Row>

            <Form.Actions>
              <Form.Indicator>
                <span case="success">{t("settings.general.saved")}</span>
              </Form.Indicator>
              <Button type="submit" className="w-[150px]" aria-label={t("settings.general.saveAria")}>
                {t("common.save")}
              </Button>
            </Form.Actions>
          </Form>
        </div>
      </div>
      {/* {isFF(FF_LSDV_E_297) && <HeidiTips collection="projectSettings" />} */}
    </div>
  );
};

GeneralSettings.menuItem = "General";
GeneralSettings.path = "/";
GeneralSettings.exact = true;
