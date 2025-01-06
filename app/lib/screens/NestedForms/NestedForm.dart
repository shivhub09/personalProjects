import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../models/FormDetailsModel.dart';
import '../../service/promoterService.dart';
import '../../utils/FormButtons/FormTabs.dart';
import '../form/FormAllFormsPage.dart';
import '../form/SelectedFormsPage.dart';

class ViewAllNestedForms extends StatefulWidget {
  final String promoterId;
  final String formId;
  const ViewAllNestedForms(
      {super.key, required this.formId, required this.promoterId});

  @override
  State<ViewAllNestedForms> createState() => _ViewAllNestedFormsState();
}

class _ViewAllNestedFormsState extends State<ViewAllNestedForms> {
  late Future<FormDetails> _formDetailsFuture;

  @override
  void initState() {
    super.initState();
    _formDetailsFuture = FormService.fetchFormDetails(widget.formId);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: GestureDetector(
          onTap: () {
            Navigator.pop(context);
          },
          child: const Icon(
            Icons.arrow_back_ios_new,
            color: Colors.grey,
            size: 18,
          ),
        ),
        title: Text(
          "View Nested Forms",
          style: GoogleFonts.poppins(
              fontSize: 16, color: Colors.white, fontWeight: FontWeight.w600),
        ),
        automaticallyImplyLeading: false,
        backgroundColor: Colors.black,
      ),
      backgroundColor: Colors.black,
      body: FutureBuilder<FormDetails>(
        future: _formDetailsFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (snapshot.hasData) {
            if (snapshot.data!.nestedFormIds.isEmpty) {
              return const Center(child: Text('No form IDs found'));
            }
            return Column(
              children: [
                Expanded(
                  child: ListView.builder(
                    itemCount: snapshot.data!.nestedFormIds.length,
                    itemBuilder: (context, index) {
                      return GestureDetector(
                        onTap: () {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => SelectedFormsPage(
                                        formTitle:
                                            "Form " + (index + 1).toString(),
                                        formId:
                                            snapshot.data!.nestedFormIds[index],
                                        promoterId: widget.promoterId,
                                      )));
                        },
                        child: FormTabs(
                          id: snapshot.data!.nestedFormIds[index],
                          title: "Form " + (index + 1).toString(),
                        ),
                      );
                    },
                  ),
                ),
              ],
            );
          } else {
            return const Center(child: Text('No data found'));
          }
        },
      ),
    );
  }
}
