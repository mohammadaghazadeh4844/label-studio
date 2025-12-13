import i18n from "i18next";
import type { TipsCollection } from "./types";

const t = (key: string) => i18n.t(key);

export const defaultTipsCollection: TipsCollection = {
  projectCreation: [
    {
      title: t("heidiTips.projectCreation.workspaceIntro.title"),
      content: t("heidiTips.projectCreation.workspaceIntro.content"),
      closable: true,
      link: {
        label: t("heidiTips.links.learnMore"),
        url: "https://docs.humansignal.com/guide/manage_projects#Create-workspaces-to-organize-projects",
        params: {
          experiment: "project_creation_tip",
          treatment: "find_and_manage_projects",
        },
      },
    },
    {
      title: t("heidiTips.projectCreation.fasterProvisioning.title"),
      content: t("heidiTips.projectCreation.fasterProvisioning.content"),
      closable: true,
      link: {
        label: t("heidiTips.links.learnMore"),
        url: "https://docs.humansignal.com/guide/manage_projects#Add-or-remove-members-to-a-workspace",
        params: {
          experiment: "project_creation_tip",
          treatment: "faster_provisioning",
        },
      },
    },
    {
      title: t("heidiTips.projectCreation.annotatorDashboard.title"),
      content: t("heidiTips.projectCreation.annotatorDashboard.content"),
      closable: true,
      link: {
        label: t("heidiTips.links.learnMore"),
        url: "https://docs.humansignal.com/guide/dashboard_annotator",
        params: {
          experiment: "project_creation_tip",
          treatment: "annotator_dashboard",
        },
      },
    },
    {
      title: t("heidiTips.projectCreation.accessControl.title"),
      content: t("heidiTips.projectCreation.accessControl.content"),
      closable: true,
      link: {
        label: t("heidiTips.links.learnMore"),
        url: "https://docs.humansignal.com/guide/manage_users#Roles-in-Label-Studio-Enterprise",
        params: {
          experiment: "project_creation_tip",
          treatment: "access_to_projects",
        },
      },
    },
    {
      title: t("heidiTips.projectCreation.templates.title"),
      content: t("heidiTips.projectCreation.templates.content"),
      closable: true,
      link: {
        label: t("heidiTips.links.learnMore"),
        url: "https://labelstud.io/guide/setup",
        params: {
          experiment: "project_creation_tip",
          treatment: "templates",
        },
      },
    },
    {
      title: t("heidiTips.projectCreation.genai.title"),
      content: t("heidiTips.projectCreation.genai.content"),
      closable: true,
      link: {
        label: t("heidiTips.links.exploreTemplates"),
        url: "https://labelstud.io/templates/gallery_generative_ai",
        params: {
          experiment: "project_creation_tip",
          treatment: "genai_templates",
        },
      },
    },
  ],
  organizationPage: [
    {
      title: t("heidiTips.organizationPage.teamGrowing.title"),
      content: t("heidiTips.organizationPage.teamGrowing.content"),
      closable: true,
      link: {
        label: t("heidiTips.links.learnMore"),
        url: "https://docs.humansignal.com/guide/manage_users#Roles-in-Label-Studio-Enterprise",
        params: {
          experiment: "organization_page_tip",
          treatment: "team_growing",
        },
      },
    },
    {
      title: t("heidiTips.organizationPage.sso.title"),
      content: t("heidiTips.organizationPage.sso.content"),
      closable: true,
      link: {
        label: t("heidiTips.links.learnMore"),
        url: "https://docs.humansignal.com/guide/auth_setup",
        params: {
          experiment: "organization_page_tip",
          treatment: "enable_sso",
        },
      },
    },
    {
      title: t("heidiTips.organizationPage.starterCloud.title"),
      content: t("heidiTips.organizationPage.starterCloud.content"),
      closable: true,
      link: {
        label: t("heidiTips.links.learnMore"),
        url: "https://humansignal.com/pricing/",
        params: {
          experiment: "organization_page_tip",
          treatment: "starter_cloud_live",
        },
      },
    },
    {
      title: t("heidiTips.organizationPage.automateDistribution.title"),
      content: t("heidiTips.organizationPage.automateDistribution.content"),
      closable: true,
      link: {
        label: t("heidiTips.links.learnMore"),
        url: "https://docs.humansignal.com/guide/setup_project#Set-up-annotation-settings-for-your-project",
        params: {
          experiment: "organization_page_tip",
          treatment: "automate_distribution",
        },
      },
    },
    {
      title: t("heidiTips.organizationPage.shareKnowledge.title"),
      content: t("heidiTips.organizationPage.shareKnowledge.content"),
      closable: true,
      link: {
        label: t("heidiTips.links.joinCommunity"),
        url: "https://label-studio.slack.com",
        params: {
          experiment: "organization_page_tip",
          treatment: "share_knowledge",
        },
      },
    },
    {
      title: t("heidiTips.organizationPage.integrations.title"),
      content: t("heidiTips.organizationPage.integrations.content"),
      closable: true,
      link: {
        label: t("heidiTips.links.integrationsDirectory"),
        url: "https://labelstud.io/integrations/",
        params: {
          experiment: "organization_page_tip",
          treatment: "integration_points",
        },
      },
    },
  ],
  projectSettings: [
    {
      title: t("heidiTips.projectSettings.autoLabeling.title"),
      content: t("heidiTips.projectSettings.autoLabeling.content"),
      closable: true,
      link: {
        label: t("heidiTips.links.learnMore"),
        url: "https://docs.humansignal.com/guide/prompts_overview#Auto-labeling-with-Prompts",
        params: {
          experiment: "project_settings_tip",
          treatment: "auto_labeling",
        },
      },
    },
    {
      title: t("heidiTips.projectSettings.quality.title"),
      content: t("heidiTips.projectSettings.quality.content"),
      closable: true,
      link: {
        label: t("heidiTips.links.learnMore"),
        url: "https://docs.humansignal.com/guide/quality",
        params: {
          experiment: "project_settings_tip",
          treatment: "quality_and_agreement",
        },
      },
    },
    {
      title: t("heidiTips.projectSettings.evals.title"),
      content: t("heidiTips.projectSettings.evals.content"),
      closable: true,
      link: {
        label: t("heidiTips.links.learnMore"),
        url: "https://humansignal.com/evals/",
        params: {
          experiment: "project_settings_tip",
          treatment: "evals",
        },
      },
    },
    {
      title: t("heidiTips.projectSettings.cloudService.title"),
      content: t("heidiTips.projectSettings.cloudService.content"),
      closable: true,
      link: {
        label: t("heidiTips.links.learnMore"),
        url: "https://humansignal.com/platform/",
        params: {
          experiment: "project_settings_tip",
          treatment: "infrastructure_and_upgrades",
        },
      },
    },
    {
      title: t("heidiTips.projectSettings.starterCloud.title"),
      content: t("heidiTips.projectSettings.starterCloud.content"),
      link: {
        label: t("heidiTips.links.learnMore"),
        url: "https://humansignal.com/pricing/",
        params: {
          experiment: "project_settings_tip",
          treatment: "starter_cloud_live",
        },
      },
    },
    {
      title: t("heidiTips.projectSettings.connectModels.title"),
      content: t("heidiTips.projectSettings.connectModels.content"),
      closable: true,
      link: {
        label: t("heidiTips.links.learnMore"),
        url: "https://labelstud.io/guide/ml",
        params: {
          experiment: "project_settings_tip",
          treatment: "connect_ml_models",
        },
      },
    },
  ],
};
