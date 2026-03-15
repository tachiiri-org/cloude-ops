import type { UiPolicy } from '../../contracts/ui-policy';

export const exportUiPolicy = (uiPolicy: UiPolicy): void => {
  const policyBlob = new Blob([JSON.stringify(uiPolicy, null, 2)], {
    type: 'application/json',
  });
  const policyUrl = URL.createObjectURL(policyBlob);
  const downloadLink = document.createElement('a');

  downloadLink.href = policyUrl;
  downloadLink.download = 'ui-policy.json';
  downloadLink.click();
  URL.revokeObjectURL(policyUrl);
};
