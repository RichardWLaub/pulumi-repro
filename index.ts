import * as k8s from '@pulumi/kubernetes';

const istioInit = new k8s.helm.v2.Chart('istio-init', {
  path: 'istio-1.1.4/install/kubernetes/helm/istio-init'
});

new k8s.helm.v2.Chart(
  'istio',
  {
    path: 'istio-1.1.4/install/kubernetes/helm/istio',
    values: {
      gateways: { enabled: false },
      galley: { enabled: true },
      mixer: { policy: { enabled: false }, telemetry: { enabled: false } },
      pilot: { autoscaleEnabled: true, autoscaleMax: 5, autoscaleMin: 2 },
      prometheus: { enabled: false },
      sidecarInjectorWebhook: { enabled: true }
    }
  },
  { dependsOn: [istioInit] }
);
