A Github Action to set up a variety of tools for Continuous Delivery.

## Supported Tools

- [jq](https://stedolan.github.io/jq/)
- [yq](https://github.com/mikefarah/yq)
- [kubectl](https://github.com/kubernetes/kubectl)
- [kustomize](https://github.com/kubernetes-sigs/kustomize)
- [skaffold](https://github.com/GoogleContainerTools/skaffold)
- [helm](https://github.com/helm/helm)
- [hub](https://github.com/github/hub)

## Usage

```
name: Deployment
on: [push]
jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    steps:
      ...
      - name: Set up tools
        uses: coscene-io/setup-cd-tools@v2
        with:
          kubectl: '1.22.2'
          kustomize: '4.5.4'
          skaffold: '1.38.0'
          helm: '3.8.2'
          yq: '2.3.0'
          jq: '1.6'
          hub: '2.14.2'
      ...
```
