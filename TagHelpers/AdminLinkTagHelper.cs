using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace WesternPlains.App.TagHelpers
{
  [HtmlTargetElement("admin-link", Attributes = "controller, action")]
    public class AdminLinkTagHelper: TagHelper
    {
        public string Controller { get; set; }
        public string Action { get; set; }
        public bool NewTab { get; set; }


        [ViewContext]
        public ViewContext ViewContext { get; set; }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            var urlHelper = new UrlHelper(ViewContext);

            var menuUrl = urlHelper.Action(Action, Controller);

            output.TagName = "a";
            output.Attributes.Add("href", $"{menuUrl}");
            output.Attributes.Add("class", "ui button blue");

            if (NewTab) {
              output.Attributes.Add("target", "_blank");
            }
        }
    }
}
